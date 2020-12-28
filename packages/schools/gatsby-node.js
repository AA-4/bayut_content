const path = require('path');
const { sh } = require('tasksfile');

const config = require(`./gatsby/config.js`);

const createPages = require(`./gatsby/nodes/createPages`);
const createRedirects = require(`./gatsby/nodes/createRedirects`);
const createSitemaps = require(`./gatsby/nodes/createSitemaps`);

const envBuild = process.env.GATSBY_BUILD_BLOG;
const environment = process.env.GATSBY_ACTIVE_ENV;
let blog = config.blogs.schools;
exports.createPages = async ({ actions, graphql }) => {
    const allPages = await createPages({ actions, graphql, blog, environment });
    await createRedirects({ actions, graphql, blog, environment });
    await createSitemaps({ blog, allPages });
};

exports.onPostBuild = async function onPostBuild() {
    if (environment === 'dev') sh(`yarn serve ${envBuild}`, { nopipe: true });
    if (environment === 'stage') sh(`yarn deploy ${envBuild} stage`, { nopipe: true });
    if (environment === 'prod') sh(`yarn deploy ${envBuild} prod`, { nopipe: true });
};
