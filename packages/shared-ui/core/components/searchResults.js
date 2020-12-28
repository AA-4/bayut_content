import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CategoryPost, Spinner, SearchPagination } from 'shared-ui/core/components';
import config from 'schools/gatsby/config';
import Helmet from 'react-helmet';
import scrollTo from 'shared-ui/core/helpers/scroll';
import arLocale from 'schools/src/locales/ar/translations.json';
import enLocale from 'schools/src/locales/en-US/translations.json';

const SearchResults = ({ location, lang, loaderHandler }) => {
    const locale = lang === 'ar' ? arLocale : enLocale;
    const blog = process.env.GATSBY_BUILD_BLOG;
    const {
        blogs: {
            [blog]: { graphqlSettings },
        },
    } = config;
    const queryLang = lang === 'ar' ? 'AR' : 'EN';
    const alternateQueryLang = lang === 'ar' ? 'EN' : 'AR';
    const alternateMetaHref =
        lang === 'ar'
            ? `${location.origin}/${blog}/${location.search}`
            : `${location.origin}/${blog}/ar/${location.search}`;

    const queryString = location.search
        .substr(1)
        .split('s=')[1]
        .replace(/[+]/g, '%20');

    let defaultPageNumber = 1;
    // get from local storage when page refresh with browser button
    if (localStorage.getItem('searchPage')) {
        defaultPageNumber = Number(localStorage.getItem('searchPage'));
        // remove localstorage
        localStorage.removeItem('searchPage');
    }
    const [results, setResults] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPosts, setTotalPosts] = useState(1);
    const [count, setCount] = useState(defaultPageNumber);

    const fetchMore = useCallback(
        pageNumber => {
            const pageSize = 10;
            let offset = pageNumber * pageSize - pageSize;
            let pageNumberQueryString = pageNumber > 1 ? 'page/' + pageNumber + '/' : '';
            window.history.pushState(
                pageNumber,
                '',
                `${location.origin}${location.pathname}${pageNumberQueryString}${location.search}`,
            );
            fetch(
                `${graphqlSettings.url}?query={


                    posts(where: {language: ${queryLang}, search: "${decodeURI(
                    queryString,
                )}", offsetPagination: {offset: ${offset}, size: ${pageSize}}}) {
                        nodes {
                          id
                          title
                          slug
                          excerpt
                          
                          featuredImage {
                            node {
                                sourceUrl(size: MEDIUM_LARGE)
                                srcSet
                                mediaItemUrl
                                altText
                            }
                            
                          }
                        }
                        pageInfo {
                          offsetPagination {
                            hasMore
                            hasPrevious
                            total
                          }
                        }
                      }
          }
`,
            )
                .then(response => response.json())
                .then(resultData => {
                    setResults(resultData.data.posts.nodes);
                    setTotalPages(
                        Math.ceil(resultData.data.posts.pageInfo.offsetPagination.total / pageSize),
                    );
                    setTotalPosts(resultData.data.posts.pageInfo.offsetPagination.total);
                });
        },
        [
            graphqlSettings,
            queryString,
            queryLang,
            location.origin,
            location.pathname,
            location.search,
        ],
    );
    const pagesClickEvent = useCallback(
        count => {
            scrollTo(document.documentElement, 0, 500);
            setResults('');
            setCount(count);
            fetchMore(count);
        },
        [fetchMore],
    );
    useEffect(() => {
        fetchMore(count);
    }, [fetchMore, count]);
    //browser back button
    window.addEventListener('popstate', event => {
        // back to 1st page
        if (window.location.pathname.includes('/page/')) {
            let pathNameArray = window.location.pathname.split('/page/');
            window.location = `${pathNameArray[0]}/${window.location.search}`;
        }
    });
    return (
        <div className="container categoryWrap">
            <Helmet defer={false}>
                <title>
                    {locale.search_results_for_meta} {decodeURI(queryString)} | {blog}
                </title>
                <meta property="og:url" content={decodeURI(window.location.href)} />
                {count > 1 && (
                    <link
                        rel="prev"
                        href={`${location.origin}${location.pathname}page/${count - 1}/${
                            location.search
                        }`}
                    />
                )}
                {totalPosts > 0 && totalPages >= count + 1 && (
                    <link
                        rel="next"
                        href={`${location.origin}${location.pathname}page/${count + 1}/${
                            location.search
                        }`}
                    />
                )}

                <meta
                    property="og:title"
                    content={`${locale.search_results_for_meta} ${decodeURI(
                        queryString,
                    )} | ${blog}`}
                />
                <meta
                    name="twitter:title"
                    content={`${locale.search_results_for_meta} ${decodeURI(
                        queryString,
                    )} | ${blog}`}
                />
                {count < 2 && (
                    <link
                        rel="alternate"
                        href={decodeURI(alternateMetaHref)}
                        hreflang={alternateQueryLang}
                        key={alternateQueryLang}
                    />
                )}
                {count < 2 && (
                    <link
                        rel="alternate"
                        href={decodeURI(window.location.href)}
                        hreflang={queryLang}
                        key={queryLang}
                    />
                )}
            </Helmet>

            <h1 className="pageHeading">
                {locale.search_results_for} {decodeURI(queryString)}
            </h1>
            <div className="flexBox">
                <div className="main">
                    <div className="listings">
                        {totalPosts > 0 ? (
                            results ? (
                                results.map(post => (
                                    <CategoryPost
                                        lang={lang}
                                        key={post.title}
                                        post={{ ...post, language: { locale: lang } }}
                                        loaderHandler={loaderHandler}
                                    />
                                ))
                            ) : (
                                <Spinner />
                            )
                        ) : (
                            <div className="errorPage">
                                {loaderHandler()}
                                <h1 className="notfoundTitle">
                                    {locale.search_results_not_found_title}
                                </h1>
                                <p>{locale.search_results_not_found_desc}</p>
                            </div>
                        )}
                    </div>
                    {results && totalPages > 1 ? (
                        <div className="pagination">
                            <div className="pageCycle">
                                <SearchPagination
                                    currentPage={count}
                                    totalPages={totalPages}
                                    totalPosts={totalPosts}
                                    parentFetchMore={pagesClickEvent}
                                    lang={lang}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
SearchResults.propTypes = {
    location: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};
export default SearchResults;
