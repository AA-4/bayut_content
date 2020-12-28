import React from 'react';
import PropTypes from 'prop-types';
import 'shared-ui/core/styles/components/searchBar.scss';

const SearchBar = ({ lang }) => {
    const blogPath =
        lang === 'ar' ? `${process.env.GATSBY_BLOG_PATH}ar/` : process.env.GATSBY_BLOG_PATH;
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    return (
        <div className="searchBar">
            <form action={blogPath} autoComplete="on">
                <input
                    className="searchField"
                    name="s"
                    type="text"
                    placeholder={locale.search}
                    required="required"
                />
                <input type="submit" value="Submit" className="searchIcon" />
            </form>
        </div>
    );
};

SearchBar.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default SearchBar;
