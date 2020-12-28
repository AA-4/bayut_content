var fs = require('fs');
const xmlBuilder = require('xmlbuilder2').create;
const _ = require('lodash');

module.exports = async ({ blog, categories }) => {
    const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    let doc = xmlBuilder(xmlStr);
    const processedCategories = [];
    categories.map(category => {
        if (
            _.indexOf(processedCategories, category.slug) === -1
        ) {
            const slug =
                category.locale === 'ar'
                    ? decodeURI(`${blog.path}/ar/${category.slug}/`)
                    : `${blog.path}/${category.slug}/`;

            doc.root()
                .ele('url')
                .ele('loc')
                .txt(`https://www.bayut.com${slug}`)
                .up()
                .ele('lastmod')
                .txt(`2020-07-13T09:41:24+00:00`)
                .up()
                .up();
            processedCategories.push(category.slug);
        }
    });
    const xml = doc.end({ prettyPrint: true });

    const stream = fs.createWriteStream(`./public${blog.path}/category-sitemap.xml`);
    stream.once('open', function(fd) {
        stream.write(xml);
        stream.end();
    });

    return {
        path: `${blog.path}/category-sitemap.xml`,
        lastmod: `2020-07-13T09:41:24+00:00`,
    };
};
