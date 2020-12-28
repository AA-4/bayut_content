import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import 'shared-ui/core/styles/components/navBar.scss';

const NavBar = ({ lang }) => {
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [guidesOpen, setGuidesOpen] = useState(false);
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    return (
        <nav className="mainNavigation left">
            <div className={`${`dropdown`} ${isMobile ? '' : `dropdownHover`}`}>
                {isMobile ? (
                    <span
                        role="presentation"
                        onClick={() => setActive(!active)}
                        onKeyDown={() => setActive(!active)}
                        className={active ? `elementOpen` : ''}
                    >
                        {locale.header.buy}
                        <svg
                            className={`${`dropdownArrow`} ${active ? `arrowFlip` : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 7"
                            fill="#888888"
                            width="12px"
                        >
                            <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                        </svg>
                    </span>
                ) : (
                    <span>
                        {locale.header.buy}
                        <svg
                            className="dropdownArrow"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 7"
                            fill="#888888"
                            width="12px"
                        >
                            <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                        </svg>
                    </span>
                )}

                <div className={`${`dropdownContent`} ${isMobile && active ? `dropdownOpen` : ''}`}>
                    <div className="triangle"></div>
                    <ul>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/apartments/dubai/`}>
                                {locale.header.buy_menu.apartments.dubai}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/villas/dubai/`}>
                                {locale.header.buy_menu.villas.dubai}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`${
                                    lang === 'ar' ? `/ar` : ``
                                }/for-sale/apartments/abu-dhabi/`}
                            >
                                {locale.header.buy_menu.apartments.abu_dhabi}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/villas/abu-dhabi/`}>
                                {locale.header.buy_menu.villas.abu_dhabi}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/apartments/sharjah/`}>
                                {locale.header.buy_menu.apartments.sharjah}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/villas/sharjah/`}>
                                {locale.header.buy_menu.villas.sharjah}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/apartments/ajman/`}>
                                {locale.header.buy_menu.apartments.ajman}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/for-sale/villas/ajman/`}>
                                {locale.header.buy_menu.villas.ajman}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${`dropdown`} ${isMobile ? '' : `dropdownHover`}`}>
                {isMobile ? (
                    <span
                        role="presentation"
                        onClick={() => setOpen(!open)}
                        onKeyDown={() => setOpen(!open)}
                        className={open ? `elementOpen` : ''}
                    >
                        {locale.header.rent}
                        <svg
                            className={`${`dropdownArrow`} ${open ? `arrowFlip` : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 7"
                            fill="#888888"
                            width="12px"
                        >
                            <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                        </svg>
                    </span>
                ) : (
                    <span>
                        {locale.header.rent}

                        <svg
                            className="dropdownArrow"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 7"
                            fill="#888888"
                            width="12px"
                        >
                            <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                        </svg>
                    </span>
                )}

                <div className={`${`dropdownContent`} ${isMobile && open ? `dropdownOpen` : ''}`}>
                    <div className="triangle"></div>
                    <ul>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/apartments/dubai/`}>
                                {locale.header.rent_menu.apartments.dubai}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/villas/dubai/`}>
                                {locale.header.rent_menu.villas.dubai}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/apartments/abu-dhabi/`}>
                                {locale.header.rent_menu.apartments.abu_dhabi}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/villas/abu-dhabi/`}>
                                {locale.header.rent_menu.villas.abu_dhabi}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/apartments/sharjah/`}>
                                {locale.header.rent_menu.apartments.sharjah}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/villas/sharjah/`}>
                                {locale.header.rent_menu.villas.sharjah}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/apartments/ajman/`}>
                                {locale.header.rent_menu.apartments.ajman}
                            </a>
                        </li>
                        <li>
                            <a href={`${lang === 'ar' ? `/ar` : ``}/to-rent/villas/ajman/`}>
                                {locale.header.rent_menu.villas.ajman}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {isMobile && (
                <div className="dropdown">
                    <span
                        role="presentation"
                        onClick={() => setGuidesOpen(!guidesOpen)}
                        onKeyDown={() => setGuidesOpen(!guidesOpen)}
                        className={guidesOpen ? `elementOpen` : ''}
                    >
                        {locale.header.guides}
                        <svg
                            className={`${`dropdownArrow`} ${guidesOpen ? `arrowFlip` : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 7"
                            fill="#888888"
                            width="12px"
                        >
                            <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                        </svg>
                    </span>
                    <div className={`${`dropdownContent`} ${guidesOpen ? `dropdownOpen` : ''}`}>
                        <ul>
                            <li>
                                <a href={`${lang === 'ar' ? `/ar` : ``}/area-guides/`}>
                                    {locale.header.area_guides}
                                </a>
                            </li>
                            <li>
                                <a href={`${lang === 'ar' ? `/ar` : ``}/schools/`}>
                                    {locale.header.school_guides}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {isMobile && (
                <a href={`/mybayut/${lang === 'ar' ? `ar/` : ``}`} className="anchor">
                    {locale.header.blog}
                </a>
            )}
            <a href={`${lang === 'ar' ? `/ar` : ``}/floorplans/`} className="anchor">
                {locale.header.floor_plans}
            </a>
            <a href={`${lang === 'ar' ? `/ar` : ``}/companies/`} className="anchor">
                {locale.header.agents}
            </a>
        </nav>
    );
};
NavBar.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default NavBar;
