var fs = require('fs');
const xmlBuilder = require('xmlbuilder2').create;

module.exports = async ({ blog }) => {
    const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    let doc = xmlBuilder(xmlStr);

    doc.root()
        .ele('url')
        .ele('loc')
        .txt(`https://www.bayut.com${blog.path}/`)
        .up()
        .ele('lastmod')
        .txt('2020-02-04T07:13:27+00:00')
        .up()
        .up()
        .ele('url')
        .ele('loc')
        .txt(`https://www.bayut.com${blog.path}/ar/`)
        .up()
        .ele('lastmod')
        .txt('2020-01-02T10:21:03+00:00')
        .up()
        .up();

    const xml = doc.end({ prettyPrint: true });

    const pageSitemapStream = fs.createWriteStream(`./public${blog.path}/page-sitemap.xml`);
    pageSitemapStream.once('open', function(fd) {
        pageSitemapStream.write(xml);
        pageSitemapStream.end();
    });
    return { path: `${blog.path}/page-sitemap.xml`, lastmod: `2020-02-04T07:13:27+00:00` };
};
