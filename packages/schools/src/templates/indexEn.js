import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Layout, SearchResults, Spinner } from 'shared-ui/core/components';
import { HomePage, PostPreview } from '../components';
import 'schools/src/styles/templates/index.scss';

const IndexEnPage = props => {
    const [spinnerClass, setSpinnerClass] = useState('show');
    const [layoutClass, setLayoutClass] = useState('hide');
    const [searchSpinner, setsearchSpinner] = useState('show');
    const [searchLayout, setsearchLayout] = useState('hide');
    const {
        data: {
            wpgraphqlschools: { page },
        },
        data,
        location,
        pageContext: { posts, lang },
    } = props;
    function loaderHandler() {
        setsearchSpinner('hide');
        setsearchLayout('show');
    }
    useEffect(() => {
        setSpinnerClass('hide');
        setLayoutClass('show');
    }, []);

    return (
        <>
            {location.search.startsWith('?s=') ? (
                <>
                    <div className={searchSpinner}>
                        <Spinner></Spinner>
                    </div>
                    <div className={searchLayout}>
                        <Layout data={{ ...page, type: 'search' }} lang={lang}>
                            <SearchResults
                                location={location}
                                lang={lang}
                                loaderHandler={loaderHandler}
                            />
                        </Layout>
                    </div>
                </>
            ) : (
                <>
                    {location.search.includes('preview=true') ? (
                        <>
                            <div className={spinnerClass}>
                                <Spinner></Spinner>
                            </div>
                            <div className={layoutClass}>
                                <Layout data={{ ...page, type: 'preview' }} lang={lang}>
                                    <PostPreview location={location} lang={lang} />
                                </Layout>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={spinnerClass}>
                                <Spinner></Spinner>
                            </div>
                            <div className={layoutClass}>
                                <Layout data={{ ...page, type: 'index' }} lang={lang}>
                                    <HomePage data={{ ...data, posts }} lang={lang} />
                                </Layout>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};
export default IndexEnPage;

export const pageQuery = graphql`
    query {
        wpgraphqlschools {
            categories(first: 100, where: { language: EN, hideEmpty: true }) {
                nodes {
                    id
                    name
                    slug
                    children(first: 100, where: { hideEmpty: true }) {
                        nodes {
                            id
                            name
                            slug
                            children(first: 100, where: { hideEmpty: true }) {
                                nodes {
                                    id
                                    name
                                    slug
                                }
                            }
                        }
                    }
                }
            }
            page(idType: URI, id: "explore-the-schools-of-uae") {
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
                seo {
                    title
                    metaDesc
                    metaRobotsNofollow
                    metaRobotsNoindex
                    opengraphDescription
                    opengraphTitle
                    twitterTitle
                }
            }
            Dubai: category(idType: SLUG, id: "dubai") {
                name
                slug
            }
            DubaiPosts: posts(
                first: 6
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "dubai"
                    tag: "homepage-post"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: ALIA_CHILD_GRID_BANNER_SMALL)
                            srcSet
                            mediaItemUrl
                            altText
                        }
                    }
                    language {
                        locale
                    }
                }
            }
            AbuDhabi: category(idType: SLUG, id: "abu-Dhabi") {
                name
                slug
            }
            AbuDhabiPosts: posts(
                first: 3
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "abu-dhabi"
                    tag: "homepage-post"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: ALIA_CHILD_GRID_BANNER_SMALL)
                            srcSet
                            mediaItemUrl
                            altText
                        }
                    }
                    language {
                        locale
                    }
                }
            }
            Sharjah: category(idType: SLUG, id: "sharjah") {
                name
                slug
            }
            SharjahPosts: posts(
                first: 3
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "sharjah"
                    tag: "homepage-post"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: ALIA_CHILD_GRID_BANNER_SMALL)
                            srcSet
                            mediaItemUrl
                            altText
                        }
                    }
                    language {
                        locale
                    }
                }
            }
        }
    }
`;
