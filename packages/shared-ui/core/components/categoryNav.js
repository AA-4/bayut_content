import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import arMenu from 'schools/src/menus/ar';
import enMenu from 'schools/src/menus/en';

const CategoryNav = ({ lang }) => {
    const blog = process.env.GATSBY_BUILD_BLOG;
    const blogPath = process.env.GATSBY_BLOG_PATH;
    let currentMenu = lang === 'ar' ? arMenu : enMenu;

    const { [blog]: items } = currentMenu;

    return (
        <nav className="subNavigation">
            {items &&
                items.items.map(item => (
                    <Link
                        to={`${blogPath}${lang === 'ar' ? 'ar/' : ''}${item.slug}/`}
                        className="anchor"
                        key={item.slug}
                        activeClassName="active"
                        partiallyActive={true}
                    >
                        {item.title}
                    </Link>
                ))}
        </nav>
    );
};
CategoryNav.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default CategoryNav;
