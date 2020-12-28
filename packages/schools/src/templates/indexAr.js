import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Layout, SearchResults, Spinner } from 'shared-ui/core/components';
import { HomePage, PostPreview } from '../components';
const IndexArPage = props => {
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
                                    <PostPreview location={location} lang={lang}/>
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
export default IndexArPage;

export const pageQuery = graphql`
    query {
        wpgraphqlschools {
            categories(first: 100, where: { language: AR, hideEmpty: true }) {
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
            page(idType: URI, id: "%d8%aa%d8%b9%d8%b1%d9%81-%d8%b9%d9%84%d9%89-%d9%85%d8%af%d8%a7%d8%b1%d8%b3-%d8%a7%d9%84%d8%a5%d9%85%d8%a7%d8%b1%d8%a7%d8%aa") {
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
            Dubai: category(idType: SLUG, id: "دبي") {
                name
                slug
            }
            DubaiPosts: posts(
                first: 6
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "دبي"
                    tag: "homepage-post-ar"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: MEDIUM_LARGE)
                            mediaItemUrl
                            altText
                        }
                    }
                    language {
                        locale
                    }
                }
            }
            AbuDhabi: category(idType: SLUG, id: "ابوظبي") {
                name
                slug
            }
            AbuDhabiPosts: posts(
                first: 6
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "ابوظبي"
                    tag: "homepage-post-ar"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: MEDIUM_LARGE)
                            mediaItemUrl
                            altText
                        }
                    }
                    language {
                        locale
                    }
                }
            }Sharjah: category(idType: SLUG, id: "الشارقة") {
                name
                slug
            }
            SharjahPosts: posts(
                first: 6
                where: {
                    orderby: { field: DATE, order: DESC }
                    categoryName: "الشارقة"
                    tag: "homepage-post-ar"
                }
            ) {
                nodes {
                    id
                    slug
                    title
                    excerpt
                    featuredImage {
                        node {
                            sourceUrl(size: MEDIUM_LARGE)
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

