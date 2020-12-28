import React, { useEffect, useState } from 'react';
import { PostContent } from '../components';
import Helmet from 'react-helmet';
import config from 'schools/gatsby/config';

const PostPreview = ({ location, lang }) => {
    const {
        blogs: {
            [process.env.GATSBY_BUILD_BLOG]: { graphqlSettings },
        },
    } = config;

    const params = new URLSearchParams(location.search);
    let postId = params.get('p');
    let previewType = 'post';
    if (postId == null && params.get('preview_id')) {
        postId = params.get('preview_id');
    } else if (postId == null && params.get('page_id')) {
        postId = params.get('page_id');
        previewType = 'page';
    }

    const [postData, setPostData] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading');
    const graphqlUrl =
        process.env.GATSBY_ACTIVE_ENV === 'stage'
            ? process.env.GATSBY_STAGE_GRAPH_URL
            : graphqlSettings.url;
    useEffect(() => {
        fetch(
            `${graphqlUrl}?query={${previewType}(id:"${postId}", idType: DATABASE_ID) {
            revisions(where: {orderby: {order: DESC, field: DATE}}, first: 1) {
                nodes {
                    title
                    content
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
                        node{
                        mediaItemUrl
                        sourceUrl(size: ALIA_CHILD_GRID_BANNER_LARGE)
                        srcSet
                        }
                    }
                    language {
                        locale
                    }
                }
            }
          }
        }`,
            {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
            },
        )
            .then(response => response.json())
            .then(resultData => {
                const { data } = resultData;
                if (data == null) {
                    setLoadingMessage("Error Loading Preview! Make sure you're logged in!");
                } else if (data.post == null) {
                    setLoadingMessage('Post data is null!');
                } else if (data.post != null && data.post.revisions.nodes.length > 0)
                    setPostData(data.post.revisions.nodes[0]);
                else if (data.page != null && data.page.revisions.nodes.length > 0)
                    setPostData(data.page.revisions.nodes[0]);
            })
            .catch(error => {
                setLoadingMessage(error);
            });
    });

    if (postData) {
        const { seo } = postData;
        return (
            <div>
                <Helmet defer={false}>
                    <title>{seo.title ? seo.title : postData.title}</title>
                    <meta
                        name="description"
                        content={seo.metaDesc ? seo.metaDesc : 'No Description Present'}
                    />
                </Helmet>
                <PostContent postData={postData} lang={lang} />
            </div>
        );
    }
    return <div>{loadingMessage}</div>;
};
export default PostPreview;
