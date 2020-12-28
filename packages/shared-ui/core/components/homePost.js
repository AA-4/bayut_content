import React from 'react';
import PropTypes from 'prop-types';

import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import config from 'schools/gatsby/config';
import { pixel } from 'shared-ui/core/images';
import 'shared-ui/core/styles/components/categoryPost.scss';

const HomePagePost = ({ lazyload, post }) => {
    const blog = process.env.GATSBY_BUILD_BLOG;
    const isJsEnabled = useIsJsEnabled();
    const {
        blogs: {
            [blog]: { uploadPath },
        },
    } = config;
    const {
        language: { locale },
    } = post;

    let featuredimage =
        post.featuredImage.node != null
            ? post.featuredImage.node.sourceUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : '';
    // let srcSet =
    //     post.featuredImage != null
    //         ? post.featuredImage.srcSet.replace(
    //               new RegExp(uploadPath.wordpress, 'g'),
    //               uploadPath.cdn,
    //           )
    //         : '';
    return (
        <div className="listItem">
            <a
                href={`/${blog}/${
                    locale === 'ar' ? `ar/${decodeURI(post.slug)}/` : `${post.slug}/`
                }`}
            >
                <div>
                    {featuredimage && (
                        <img
                            src={(lazyload === `1`) & isJsEnabled ? pixel : featuredimage}
                            data-src={featuredimage}
                            // data-srcset={srcSet}
                            alt={post.title}
                            className={lazyload === `1` ? `lazyload` : ``}
                        />
                    )}
                    <h3 className="postTitle">{post.title}</h3>
                </div>
            </a>
        </div>
    );
};

HomePagePost.defaultProps = {
    post: {
        language: {
            locale: 'en_US',
        },
    },
    lazyload: `1`,
};

HomePagePost.propTypes = {
    post: PropTypes.object.isRequired,
};
export default HomePagePost;
