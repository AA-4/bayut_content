const path = require(`path`);
const _ = require('lodash');

module.exports = async ({ actions, graphql, blog, environment }) => {
    const { createPage } = actions;
    const allPosts = [];
    const postTemplate = path.resolve(`src/templates/post.js`);

    if (environment === 'dev') console.log('Blog Provided', blog.path);

    const query = `query ($first:Int $after:String){
        ${blog.graphqlQuery} {
            posts(first: $first, after: $after) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                nodes {
                    id
                    title
                    uri
                    slug
                    postId
                    date
                    modifiedGmt
                    language {
                        locale
                    }
                    featuredImage {
                        node {
                            sourceUrl(size: MEDIUM_LARGE)
                            srcSet
                            mediaItemUrl
                            altText
                        }
                    }
                    categories {
                        nodes {
                            id
                            databaseId
                            name
                            seo {
                                title
                                metaDesc
                            }
                            slug
                            language {
                                locale
                            }
                            translations {
                                link
                                slug
                                count
                                parentId
                                language {
                                    locale
                                }
                            }
                            parent {
                                node {
                                    id
                                    databaseId
                                    name
                                    seo {
                                        title
                                        metaDesc
                                    }
                                    slug
                                    language {
                                        locale
                                    }
                                    translations {
                                        link
                                        slug
                                        count
                                        parentId
                                        language {
                                            locale
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;

    const fetchPostsChunk = async variables =>
        await graphql(query, variables).then(({ data }) => {
            if (environment === 'dev') console.log('fetchPostsChunk');
            const {
                [blog.graphqlQuery]: {
                    posts: {
                        nodes,
                        pageInfo: { hasNextPage, endCursor },
                    },
                },
            } = data;

            //  push the chunk in Array
            nodes.map(post => {
                if (
                    post.slug !== 'burj-khalifa' &&
                    post.slug !== '%d8%a8%d8%b1%d8%ac-%d8%ae%d9%84%d9%8a%d9%81%d8%a9'
                )
                    allPosts.push(post);
            });

            //  if there is more data , fetch the next chunk
            if (hasNextPage) {
                return fetchPostsChunk({ first: 25, after: endCursor });
            }

            return allPosts;
        });

    await fetchPostsChunk({ first: 25, after: null });

    allPosts.map(post => {
        if (environment === 'dev') console.log(`create post: ${blog.path}/${post.slug}`);

        createPage({
            path:
                post.language.locale === 'ar'
                    ? decodeURI(`${blog.path}/ar/${post.slug}/`)
                    : `${blog.path}/${post.slug}/`,
            component: postTemplate,
            context: {
                id: post.id,
                lang: post.language.locale === 'ar' ? 'ar' : 'en',
            },
        });
    });

    if (environment === 'dev') console.log(`create landing page: ${blog.path}`);
    createPage({
        path: `${blog.path}/`,
        component: path.resolve(`src/templates/indexEn.js`),
        context: { posts: allPosts, lang: 'en' },
    });

    createPage({
        path: `${blog.path}/ar/`,
        component: path.resolve(`src/templates/indexAr.js`),
        context: { posts: allPosts, lang: 'ar' },
    });

    let categoriesData = [],
        subCategories = [];
    const categoryTemplate = path.resolve(`src/templates/category.js`),
        postsPerPage = 10;

    allPosts.forEach(post => {
        post.categories.nodes.forEach(category => {
                if (!_.find(categoriesData, { slug: category.slug, id: post.id }))
                    categoriesData.push({
                        slug: category.slug,
                        id: post.id,
                        locale: category.language.locale,
                        category,
                        post,
                    });

                const { node } = Object(category.parent);
                if (node) {
                    subCategories.push({
                        child_database_id: category.databaseId,
                        parent_slug: node.slug,
                        child: category,
                    });
                    if (!_.find(categoriesData, { slug: node.slug, id: post.id }))
                        categoriesData.push({
                            slug: node.slug,
                            id: post.id,
                            locale: category.language.locale,
                            category: node,
                            post,
                        });
                }
        });
    });

    const processedCategories = [];
    categoriesData.forEach(category => {
        if (_.indexOf(processedCategories, category.slug) === -1) {
            let filteredPosts = [];
            _.filter(categoriesData, ['slug', category.slug]).forEach(item => {
                filteredPosts.push(item.post);
            });
            filteredPosts = _.orderBy(filteredPosts, ['date'], ['asc']);
            const totalCatPosts = filteredPosts.length;
            filteredPosts = _.chunk(filteredPosts, postsPerPage);

            if (environment === 'dev') console.log(`Category: ${category.slug} Posts`);

            let _subCategories = _.filter(subCategories, ['parent_slug', category.slug]);
            _subCategories = _.uniqWith(_subCategories, _.isEqual);
            _subCategories = _.sortBy(_subCategories, ['child_database_id']);
            const finalSubCategories = [];
            _subCategories.forEach(category => {
                finalSubCategories.push(category.child);
            });
            filteredPosts.forEach((pagePosts, index) => {
                category.locale === 'ar'
                    ? (categoryPath = decodeURI(`${blog.path}/ar/${category.slug}/`))
                    : (categoryPath = `${blog.path}/${category.slug}/`);

                createPage({
                    path: index == 0 ? `${categoryPath}` : `${categoryPath}page/${index + 1}/`,
                    component: categoryTemplate,
                    context: {
                        id: category.id,
                        categoryId: category.categoryId,
                        limit: postsPerPage,
                        after: null,
                        totalPages: filteredPosts.length,
                        totalPosts: totalCatPosts,
                        currentPage: index + 1,
                        category: category.category,
                        posts: pagePosts,
                        subCategories: finalSubCategories,
                        lang: category.locale === 'ar' ? 'ar' : 'en',
                    },
                });
            });
            processedCategories.push(category.slug);
        }
    });

    return { posts: allPosts, categories: categoriesData };
};
