import React from 'react';
import PropTypes from 'prop-types';
const SearchPagination = ({ currentPage, totalPages, totalPosts, parentFetchMore, lang }) => {
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
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
                <button
                    className="prevBtn"
                    onClick={() => {
                        parentFetchMore(currentPage - 1);
                    }}
                >
                    <span>{locale.previous}</span>
                </button>
            )}
            {currentPage > 1 && totalPages > 3 && (
                <button
                    className="pagesBtn"
                    onClick={() => {
                        parentFetchMore(1);
                    }}
                >
                    {1}
                </button>
            )}
            {currentPage > 3 && totalPages >= 5 && <span>...</span>}
            {Array.from({ length: loopLength }, (_, index) => (
                <React.Fragment key={index}>
                    {index + loopStart === currentPage ? (
                        <span className="pagesBtn">{index + loopStart}</span>
                    ) : (
                        <button
                            className="pagesBtn"
                            onClick={() => {
                                parentFetchMore(index + loopStart);
                            }}
                            key={`page-number-${index + loopStart}`}
                        >
                            {index + loopStart}
                        </button>
                    )}
                </React.Fragment>
            ))}
            {loopEnd !== totalPages && loopEnd !== totalPages - 1 && <span>...</span>}
            {loopEnd !== totalPages && (
                <button
                    className="pagesBtn"
                    onClick={() => {
                        parentFetchMore(totalPages);
                    }}
                >
                    {totalPages}
                </button>
            )}
            {totalPosts > 0 && totalPages >= currentPage + 1 && (
                <button
                    className="nextBtn"
                    onClick={() => {
                        parentFetchMore(currentPage + 1);
                    }}
                >
                    <span>{locale.next}</span>
                </button>
            )}
        </>
    );
};

SearchPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalPosts: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
};
export default SearchPagination;
