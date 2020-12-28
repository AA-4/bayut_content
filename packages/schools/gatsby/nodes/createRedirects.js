const fs = require('fs');

module.exports = async ({ actions, graphql, blog, environment }) => {
    const { createRedirect } = actions;
    const envBuild = process.env.GATSBY_BUILD_BLOG;
    const nonTrailingSlashRedirects = [];
    const query = `query {
        ${blog.graphqlQuery} {
            getYoastRedirects {
                redirects {
                  nodes {
                    newURL
                    oldURL
                    type
                  }
                }
              }
            }
        }`;

    await graphql(query).then(({ data }) => {
        const {
            [blog.graphqlQuery]: {
                getYoastRedirects: {
                    redirects: { nodes },
                },
            },
        } = data;

        nodes.map(singleRedirect => {
            let _fromPath = singleRedirect.oldURL.startsWith(blog.path.substring(1))
                ? `/${singleRedirect.oldURL}/`
                : `${blog.path}/${singleRedirect.oldURL}/`;

            let _toPath = singleRedirect.newURL.startsWith('http')
                ? singleRedirect.newURL
                : `https://www.bayut.com/${singleRedirect.newURL}/`;

            if (environment === 'dev') {
                console.log('Old URL', _fromPath);
                console.log('New URL', _toPath);
            }

            if (_fromPath !== `${blog.path}/ar/`) {
                createRedirect({
                    fromPath: decodeURI(_fromPath),
                    toPath: _toPath,
                    isPermanent: true,
                    force: true,
                });
                nonTrailingSlashRedirects.push({
                    from: decodeURI(_fromPath.slice(0, -1)),
                    to: _toPath,
                });
            }
        });
        fs.writeFileSync(`./public/redirects.json`, JSON.stringify(nonTrailingSlashRedirects));
    });
};
