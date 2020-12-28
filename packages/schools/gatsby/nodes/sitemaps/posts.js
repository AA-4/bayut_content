var fs = require('fs');
const xmlBuilder = require('xmlbuilder2').create;

const chunkArray = (arr, size) =>
    arr.length > size ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] : [arr];

module.exports = async ({ blog, posts }) => {
    const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;

    let lastModified = '';
    let postSitemaps = [];
    const chunks = chunkArray(posts.reverse(), 1000);

    chunks.map((posts_chunk, index) => {
        let doc = xmlBuilder(xmlStr);
        posts_chunk.map(post => {
            const slug =
                post.language.locale === 'ar'
                    ? decodeURI(`${blog.path}/ar/${post.slug}/`)
                    : `${blog.path}/${post.slug}/`;
            lastModified = `${post.modifiedGmt}+00:00`;

            doc.root()
                .ele('url')
                .ele('loc')
                .txt(`https://www.bayut.com${slug}`)
                .up()
                .ele('lastmod')
                .txt(`${post.modifiedGmt}+00:00`)
                .up()
                .up();
        });
        const xml = doc.end({ prettyPrint: true });

        const stream = fs.createWriteStream(`./public${blog.path}/post-sitemap${index + 1}.xml`);
        stream.once('open', function(fd) {
            stream.write(xml);
            stream.end();
        });
        if (index === 0) {
            const stream_first = fs.createWriteStream(`./public${blog.path}/post-sitemap.xml`);
            stream_first.once('open', function(fd) {
                stream_first.write(xml);
                stream_first.end();
            });
        }
        postSitemaps.push({
            path: `${blog.path}/post-sitemap${index + 1}.xml`,
            lastmod: `${lastModified}`,
        });
    });

    return postSitemaps;
};
