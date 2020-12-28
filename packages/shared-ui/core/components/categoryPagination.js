import React from 'react';
import PropTypes from 'prop-types';
const CategoryPagination = ({ currentPage, totalPages, slug, totalPosts, lang }) => {
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    let pathPrefix = process.env.GATSBY_BUILD_BLOG;
    let langVar = lang === 'ar' ? decodeURI(`ar/${slug}`) : slug;
    let loopStart = currentPage === 2 ? currentPage : currentPage - 1;
    let loopEnd =
        currentPage <= totalPages - 2 && currentPage !== 2 ? currentPage + 1 : currentPage + 2;
    let loopLength = 0;
    if (currentPage < 2) {
        loopStart = 1;
        totalPages < 3 ? (loopEnd = totalPages) : (loopEnd = 3);
    } else if (currentPage >= totalPages - 1) {
        totalPages < 3 ? (loopStart = 1) : (loopStart = totalPages - 2);
        loopEnd = totalPages;
    }

    totalPages < 3 ? (loopLength = totalPages) : (loopLength = 3);
    return (
        <>
            {currentPage > 1 && (
                <a
                    className="prevBtn"
                    href={`/${pathPrefix}/${langVar}/${
                        currentPage - 1 > 1 ? `page/${currentPage - 1}/` : ``
                    }`}
                >
                    <span>{locale.previous}</span>
                </a>
            )}
            {currentPage > 1 && totalPages > 3 && (
                <a className="pagesBtn" href={`/${pathPrefix}/${langVar}/`}>
                    1
                </a>
            )}
            {currentPage > 3 && totalPages >= 5 && <span>...</span>}
            {Array.from({ length: loopLength }, (_, index) => (
                <React.Fragment key={index}>
                    {index + loopStart === currentPage ? (
                        <span className="pagesBtn">{index + loopStart}</span>
                    ) : (
                        <a
                            activeclass={`currentPage`}
                            className="pagesBtn"
                            href={`/${pathPrefix}/${langVar}/${
                                index + loopStart > 1 ? `page/${index + loopStart}/` : ``
                            }`}
                        >
                            {index + loopStart}
                        </a>
                    )}
                </React.Fragment>
            ))}
            {loopEnd !== totalPages && loopEnd !== totalPages - 1 && <span>...</span>}
            {loopEnd !== totalPages && (
                <a className="pagesBtn" href={`/${pathPrefix}/${langVar}/${`page/`}${totalPages}/`}>
                    {totalPages}
                </a>
            )}
            {totalPosts > 0 && totalPages >= currentPage + 1 && (
                <a
                    className="nextBtn"
                    href={`/${pathPrefix}/${langVar}/${`page/`}${currentPage + 1}/`}
                >
                    <span>{locale.next}</span>
                </a>
            )}
        </>
    );
};

CategoryPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    totalPosts: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
};
export default CategoryPagination;
