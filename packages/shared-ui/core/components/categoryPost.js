import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { decodeHTML } from '../helpers';
import config from 'schools/gatsby/config';
import { pixel } from 'shared-ui/core/images';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import 'shared-ui/core/styles/components/categoryPost.scss';

const CategoryPost = ({ lazyload, post, lang, loaderHandler }) => {
    const blog = process.env.GATSBY_BUILD_BLOG;
    const isJsEnabled = useIsJsEnabled();
    const {
        blogs: {
            [blog]: { uploadPath },
        },
    } = config;
    let featuredimage =
        post.featuredImage && post.featuredImage.node != null
            ? post.featuredImage.node.sourceUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : '';
    useEffect(() => {
        if (loaderHandler instanceof Function) {
            loaderHandler();
        }
    }, [loaderHandler]);
    return (
        <div className="listItem">
            <a href={`/${blog}/${lang === 'ar' ? `ar/${decodeURI(post.slug)}/` : `${post.slug}/`}`}>
                {featuredimage && (
                    <img
                        src={lazyload === `1` && isJsEnabled ? pixel : featuredimage}
                        data-src={featuredimage}
                        alt={decodeHTML(post.title)}
                        className={lazyload === `1` ? `lazyload` : ``}
                    />
                )}
                <h2 className="postTitle">{decodeHTML(post.title)}</h2>
            </a>
        </div>
    );
};
CategoryPost.defaultProps = {
    lazyload: `1`,
};
CategoryPost.propTypes = {
    post: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};
export default CategoryPost;
