module.exports = {
    blogs: {
        schools: {
            path: '/schools',
            graphqlQuery: 'wpgraphqlschools',
            graphqlSettings: {
                typeName: `WPGraphQLSchools`,
                fieldName: `wpgraphqlschools`,
                url: `https://www.bayut.com/schools/graphql`,
                bath: true,
            },
            siteMetadata: {
                title: `Guides for Schools in the UAE | Bayut`,
                description: `Detailed guides describing key elements of schools in the UAE, including an overview of curriculum, subjects, government ratings, fee structure and more for educational institutes in the country.`,
                url: `https://www.bayut.com/schools/`,
                image: `https://agmcdn.bayut.com/buildings/wp-content/uploads/sites/2/2019/10/bayut-logo-green.png`,
            },
            uploadPath: {
                wordpress: 'https://www.bayut.com/schools/wp-content/uploads/sites/3',
                cdn: 'https://agmcdn.bayut.com/schools/wp-content/uploads/sites/3',
            },
            s3Buckets: {
                stage: 'gatsby-stage-schools',
                production: 'gatsby-prod-schools',
            },
            GTM: {
                stage: { id: 'GTM-MH3GX9W', dataLayer: 'school guides' },
                production: { id: 'GTM-NBM8W2N', dataLayer: 'school guides' },
            },
        },
    },
};
