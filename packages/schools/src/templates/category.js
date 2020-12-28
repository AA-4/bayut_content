import React from 'react';
import { decodeHTML } from 'shared-ui/core/helpers';
import { Layout, CategoryPost, CategoryPagination, SubCategoryNav } from 'shared-ui/core/components';
import 'schools/src/styles/templates/category.scss';

const Category = props => {
    const {
        pageContext: {
            currentPage,
            totalPages,
            totalPosts,
            limit,
            posts,
            category,
            subCategories,
            lang,
        },
    } = props;
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    let displayingPostsCurrentIndex = currentPage === 1 ? 1 : (currentPage - 1) * limit;
    let displayingPostsLastIndex = currentPage === totalPages ? totalPosts : currentPage * limit;

    // Keeping it for arabic number
    // const enableArabicNumber = 0;
    // if (language === 'ar' && enableArabicNumber === 1) {
    //     displayingPostsCurrentIndex = displayingPostsCurrentIndex.toLocaleString('ar-EG');
    //     displayingPostsLastIndex = displayingPostsLastIndex.toLocaleString('ar-EG');
    //     totalPosts = totalPosts.toLocaleString('ar-EG');
    //     currentPage = currentPage.toLocaleString('ar-EG');
    // }

    return (
        <Layout
            data={{
                ...category,
                type: 'category',
                currentPage: currentPage,
                totalPages: totalPages,
            }}
            lang={lang}
        >
            <div className="container categoryWrap">
                <h1 className="pageHeading">
                    {locale.category.schools_in} {decodeHTML(category.name)}
                </h1>
                <SubCategoryNav
                    categories={subCategories}
                    parentCategory={category.name}
                    lang={lang}
                />
                {posts && posts.length > 0 && (
                    <div className="resultsCount">
                        {locale.category.displaying}{' '}
                        <span>{`${displayingPostsCurrentIndex} - ${displayingPostsLastIndex}`}</span>{' '}
                        {locale.category.of} <span>{totalPosts}</span> {locale.category.results}
                    </div>
                )}
                <div className="flexBox">
                    <div className="main">
                        <div className="listings">
                            {posts && posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <CategoryPost
                                        key={post.id}
                                        post={post}
                                        lazyload={`${index < 2 ? 0 : 1}`}
                                        lang={lang}
                                    />
                                ))
                            ) : (
                                <div>
                                    <h2>{locale.P404.title}</h2>
                                    <span>{locale.P404.description}</span>
                                </div>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="pagination">
                                <div className="pageCycle">
                                    <CategoryPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        slug={category.slug}
                                        totalPosts={totalPosts}
                                        lang={lang}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Category;
