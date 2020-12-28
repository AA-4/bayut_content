import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import config from 'schools/gatsby/config';
import { decodeHTML } from 'shared-ui/core/helpers';
import { favIcon } from 'shared-ui/core/images';

const SEO = props => {
    const { data } = props;
    const blog = process.env.GATSBY_BUILD_BLOG;
    const { seo, translations, language } = data;
    const {
        blogs: {
            [blog]: { siteMetadata, uploadPath },
        },
    } = config;

    let filteredTranslations =
        translations && translations.filter(translation => translation.language !== null);
    if (data.type === 'category')
        filteredTranslations = filteredTranslations.filter(
            translation => translation.parentId === null || translation.count,
        );
    let lang = language ? language.locale : 'en';
    if (lang !== 'ar') {
        lang = 'en';
    }
    let langLocale = lang === 'en' ? 'en_US' : 'ar_AR';
    let langHTMLTag = lang === 'en' ? 'en-US' : 'ar';

    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const fbFeaturedimage =
        data.featuredImage != null
            ? data.featuredImage.node.sourceUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : siteMetadata.fb_image;

    const twFeaturedimage =
        data.featuredImage != null
            ? data.featuredImage.node.sourceUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : siteMetadata.tw_image;

    let metaTitle = decodeHTML(
        seo && seo.title && seo.title !== '' ? seo.title : siteMetadata.title,
    );

    if (data.type === 'category' && data.currentPage && data.currentPage > 1) {
        const splits = metaTitle.split('|');
        metaTitle = `${splits.shift()}| Page ${data.currentPage} of ${data.totalPages} | ${
            lang === 'ar' ? `بيوت` : `Bayut`
        }`;
    }

    const ogType = data.type === 'post' ? 'article' : data.type === 'index' ? 'website' : 'object';

    const metaDescription = decodeHTML(
        seo && seo.metaDesc && seo.metaDesc !== '' ? seo.metaDesc : siteMetadata.description,
    );

    let siteUrl = lang === 'ar' ? `${siteMetadata.url}${lang}/` : `${siteMetadata.url}`;
    let currentUrl = data.slug ? `${siteUrl}${decodeURI(data.slug)}/` : `${siteUrl}`;
    let nextCatUrl = '';
    let prevCatUrl = '';
    if (data.type === 'category' && data.currentPage > 1) {
        prevCatUrl =
            data.currentPage === 2 ? currentUrl : `${currentUrl}page/${data.currentPage - 1}/`;
    }
    if (data.type === 'category' && data.currentPage < data.totalPages) {
        nextCatUrl = `${currentUrl}page/${data.currentPage + 1}/`;
    }
    if (data.type === 'category' && data.currentPage > 1) {
        currentUrl = `${currentUrl}page/${data.currentPage}/`;
    }

    const baseSchema = [
        {
            '@context': 'http://schema.org',
            '@type': 'Organization',
            id: `${siteMetadata.url}#wesbite`,
            url: siteMetadata.url,
            name: 'Bayut',
            logo: {
                '@type': 'ImageObject',
                '@id': siteMetadata.image,
                width: '800',
                height: '216',
                caption: 'Bayut',
            },
        },
        {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            id: `${siteMetadata.url}#wesbite`,
            url: siteMetadata.url,
            name: siteMetadata.title,
            description: siteMetadata.description,
            publisher: {
                '@id': `${siteMetadata.url}#organization`,
            },
        },
    ];

    const schema =
        data.type === 'post'
            ? [
                  ...baseSchema,
                  {
                      '@context': 'http://schema.org',
                      '@type': 'WebPage',
                      '@id': `${currentUrl}#webpage`,
                      url: currentUrl,
                      inLanguage: lang,
                      name: metaTitle,
                      isPartOf: {
                          '@id': `${siteMetadata.url}#webpage`,
                      },
                      description: metaDescription,
                      datePublished: data.datePublished,
                      dateModified: data.dateModified,
                  },
                  {
                      '@context': 'http://schema.org',
                      '@type': 'Article',
                      '@id': `${currentUrl}#article`,
                      isPartOf: {
                          '@id': `${currentUrl}#webpage`,
                      },
                      url: data.url,
                      headline: metaTitle,
                      image: {
                          '@type': 'ImageObject',
                          '@id': fbFeaturedimage,
                      },
                      description: metaDescription,
                      publisher: {
                          '@type': 'Organization',
                          url: 'https://www.bayut.com/#organization',
                          logo: {
                              '@type': 'ImageObject',
                              url: siteMetadata.image,
                          },
                          name: 'Bayut',
                      },
                      mainEntityOfPage: {
                          '@type': 'WebSite',
                          '@id': siteMetadata.url,
                      },
                      datePublished: data.datePublished,
                      dateModified: data.dateModified,
                  },
              ]
            : baseSchema;
    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: langHTMLTag,
                    dir,
                }}
                defer={false}
            >
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                {data.currentPage < 2 && <link rel="alternate" href={currentUrl} hreflang={lang} />}
                {data.type &&
                    data.type.toString() !== 'category' && filteredTranslations&&
                    filteredTranslations.length > 0 && (
                        <link rel="alternate" href={currentUrl} hreflang={lang} />
                    )}
                <link
                    rel="sitemap"
                    type="application/xml"
                    href={`https://www.bayut.com/${blog}/sitemap_index.xml`}
                />
                {filteredTranslations &&
                    data.type &&
                    data.type.toString() !== 'category' &&
                    filteredTranslations.map(translation => (
                        <link
                            rel="alternate"
                            href={decodeURI(translation.link)}
                            hreflang={
                                translation.language.locale === 'ar'
                                    ? translation.language.locale
                                    : 'en'
                            }
                            key={translation.language.locale}
                        />
                    ))}

                {filteredTranslations &&
                    data.currentPage < 2 &&
                    data.type.toString() === 'category' &&
                    filteredTranslations.map(translation => (
                        <link
                            rel="alternate"
                            href={decodeURI(translation.link)}
                            hreflang={
                                translation.language.locale === 'ar'
                                    ? translation.language.locale
                                    : 'en'
                            }
                            key={translation.language.locale}
                        />
                    ))}

                {data.type === 'category' && data.currentPage > 1 && (
                    <meta name="robots" content="noindex, follow" />
                )}

                {data.type === 'category' && data.currentPage > 1 && (
                    <link rel="prev" href={decodeURI(prevCatUrl)} />
                )}

                {data.type === 'category' && data.currentPage <= data.totalPages && (
                    <link rel="next" href={decodeURI(nextCatUrl)} />
                )}

                {/* OpenGraph tags */}
                <meta property="og:url" content={decodeURI(currentUrl)} />
                <meta property="og:type" content={ogType} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:locale" content={langLocale} />
                {filteredTranslations &&
                    filteredTranslations.length > 0 &&
                    data.type !== 'index' && (
                        <meta
                            property="og:locale:alternate"
                            content={lang === 'en' ? 'ar_AR' : 'en_US'}
                        />
                    )}
                {data.type === 'index' && (
                    <meta
                        property="og:locale:alternate"
                        content={lang === 'en' ? 'ar_AR' : 'en_US'}
                    />
                )}
                <meta property="og:site_name" content={siteMetadata.title} />
                {data.type === 'post' && 
                  data.tags &&
                    data.tags.nodes && 
                        data.tags.nodes.map(tag => (
                            <meta property="article:tag" content={tag.name} />
                ))}
                {data.type === 'post' && 
                  data.categories &&
                    data.categories.nodes && 
                        data.categories.nodes.map(category => (
                            <meta property="article:section" content={category.name} />
                ))}
                {(data.type === 'index'  || data.type === 'category') && (
                    <meta property="og:image" content={`https://agmcdn.bayut.com/gatsby/${blog}/images/${blog.slice(0, -1)}-guides-cover1.jpg`}/>
                )}
                {data.type === 'index' && (
                    <meta property="og:image:secure_url" content={`https://agmcdn.bayut.com/gatsby/${blog}/images/${blog.slice(0, -1)}-guides-cover1.jpg`}/>
                )}
                {data.type === 'post' && (
                 <meta property="og:image" content={fbFeaturedimage} />
                )}
                {data.type === 'post' && (
                 <meta property="og:image:secure_url" content={fbFeaturedimage} />
                )}
                 
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                {(data.type === 'index'  || data.type === 'category') && (
                    <meta property="twitter:image" content={`https://agmcdn.bayut.com/gatsby/${blog}/images/${blog.slice(0, -1)}-guides-cover1.jpg`}/>
                )}
                 {data.type === 'post' && (
                 <meta name="twitter:image" content={twFeaturedimage} />
                )}

                {/* Fav Icon */}
                <link rel="icon" href={favIcon} type="image/ico" sizes="16x16" />

                {/* Schema.org tags */}
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
        </>
    );
};

SEO.defaultProps = {
    data: {
        featuredImage: {
            sourceUrl: '',
        },
        language: {
            locale: 'en-US',
        },
        seo: {
            metaDesc: '',
        },
    },
    type: 'post',
    currentPage: 1,
};

SEO.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SEO;
