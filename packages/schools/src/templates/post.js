import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from 'shared-ui/core/components';
import { PostContent } from '../components';
import 'schools/src/styles/templates/post.scss';

const Post = props => {
    const {
        data: {
            wpgraphqlschools: { post },
        },
        pageContext: { lang },
    } = props;
    return (
        <Layout data={{ ...post, type: 'post' }} lang={lang}>
            <PostContent postData={post} lang={lang} />
        </Layout>
    );
};

export default Post;

export const pageQuery = graphql`
    query($id: ID!) {
        wpgraphqlschools {
            post(id: $id) {
                title
                content(format: RENDERED)
                slug
                link
                date
                modified
                seo {
                    title
                    metaDesc
                    metaRobotsNofollow
                    metaRobotsNoindex
                    opengraphDescription
                    opengraphTitle
                    twitterTitle
                }
                featuredImage {
                    node {
                        mediaItemUrl
                        sourceUrl(size: ALIA_CHILD_GRID_BANNER_LARGE)
                        srcSet
                    }
                }
                language {
                    locale
                }
                translations {
                    link
                    slug
                    language {
                        locale
                    }
                }
                tags(first:50) {
                    nodes {
                        name
                    }
                  }
                  categories {
                    nodes {
                      name
                    }
                  }
            }
        }
    }
`;
