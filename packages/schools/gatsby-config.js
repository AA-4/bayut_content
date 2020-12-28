const config = require(`./gatsby/config.js`);

const envBuild = process.env.GATSBY_BUILD_BLOG || 'schools';
const environment = process.env.GATSBY_ACTIVE_ENV;

let blog,bucket, gtmID, gtmDataLayer;
blog=config.blogs.schools || { path: '/schools' };
if (environment === 'prod') {
    bucket = config.blogs.schools.s3Buckets.production;
    gtmID = config.blogs.schools.GTM.production.id;
    gtmDataLayer = config.blogs.schools.GTM.production.dataLayer;
} else {
    bucket = config.blogs.schools.s3Buckets.stage;
    gtmID = config.blogs.schools.GTM.stage.id;
    gtmDataLayer = config.blogs.schools.GTM.stage.dataLayer;
}

module.exports = {
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-preact`,
        {
            resolve: `gatsby-plugin-react-helmet-canonical-urls`,
            options: {
                siteUrl: `https://www.bayut.com`,
            },
        },
        {
            resolve: `gatsby-plugin-loadable-components-ssr`,
            options: {
                useHydrate: false,
            },
        },
        {
            resolve: `gatsby-source-graphql`,
            options: { ...config.blogs.schools.graphqlSettings },
        },
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: bucket,
                protocol: 'https',
                hostname: 'www.bayut.com',
                acl: 'public-read',
                parallelLimit: 50,
                mergeCachingParams: false,
                generateRedirectObjectsForPermanentRedirects: true,
                params: {
                    '**/**.html': {
                        CacheControl: 'no-store',
                    },
                    'page-data/**/**.json': {
                        CacheControl: 'public, max-age=0, must-revalidate',
                    },
                    '**/static/**': {
                        CacheControl: 'public, max-age=31536000, immutable',
                    },
                    '**/**/!(sw).js': {
                        CacheControl: 'public, max-age=31536000, immutable',
                    },
                    '**/**.css': {
                        CacheControl: 'public, max-age=31536000, immutable',
                    },
                    'sw.js': {
                        CacheControl: 'public, max-age=0, must-revalidate',
                    },
                },
            },
        },
        {
            resolve: 'gatsby-plugin-asset-path',
            options: {
                removeMapFiles: true,
            },
        },
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: gtmID,
                includeInDevelopment: false,
                defaultDataLayer: { website_section: gtmDataLayer },
            },
        },
        {
            resolve: `gatsby-plugin-webfonts`,
            options: {
                fonts: {
                    google: [
                        {
                            family: 'Lato',
                            variants: ['400', '700'],
                            fontDisplay: 'swap',
                            strategy: 'selfHosted',
                        },
                        {
                            family: 'Droid Arabic Kufi',
                            variants: ['400', '700'],
                            fontDisplay: 'swap',
                            strategy: 'selfHosted',
                        },
                    ],
                },
                formats: ['woff2'],
                useMinify: true,
                usePreload: false,
                usePreconnect: true,
            },
        },
        `gatsby-plugin-js-fallback`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        //`gatsby-plugin-offline`,
        `gatsby-plugin-sass`,
    ],
    assetPrefix: `${envBuild}/assets`,
};
