var fs = require('fs');
const xmlBuilder = require('xmlbuilder2').create;
const createPageSitemap = require(`./sitemaps/pages`);
const createPostSitemap = require(`./sitemaps/posts`);
const createCategorySitemap = require(`./sitemaps/categories`);

module.exports = async ({ blog, allPages }) => {
    if (!fs.existsSync(`./public${blog.path}`)) {
        fs.mkdirSync(`./public${blog.path}`);
    }
    const { posts, categories } = allPages;
    let sitemaps = [];
    const postSitemap = await createPostSitemap({ blog, posts });
    postSitemap.map(sitemap => {
        sitemaps.push(sitemap);
    });
    sitemaps.push(await createPageSitemap({ blog }));
    sitemaps.push(await createCategorySitemap({ blog, categories }));

    const xmlStr = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>`;
    let doc = xmlBuilder(xmlStr);
    sitemaps.map(sitemap => {
        doc.root()
            .ele('sitemap')
            .ele('loc')
            .txt(`https://www.bayut.com${sitemap.path}`)
            .up()
            .ele('lastmod')
            .txt(`${sitemap.lastmod}`)
            .up()
            .up();
    });

    xml = doc.end({ prettyPrint: true });

    const sitemapIndexStream = fs.createWriteStream(`./public${blog.path}/sitemap_index.xml`);
    sitemapIndexStream.once('open', function(fd) {
        sitemapIndexStream.write(xml);
        sitemapIndexStream.end();
    });
};
