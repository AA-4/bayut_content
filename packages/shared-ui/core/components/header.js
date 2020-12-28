import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import BayutLogo from './bayutLogo';
import NavBar from './navBar';
import CategoryNav from './categoryNav';
import SearchBar from './searchBar';
import 'shared-ui/core/styles/components/header.scss';
import {
    buildingGuidesEn,
    buildingGuidesAr,
    areaGuidesEn,
    areaGuidesAr,
    schoolGuidesEn,
    schoolGuidesAr,
    myBayutEn,
    myBayutAr,
} from 'shared-ui/core/images';

const Header = props => {
    const { translations, pageType, locale, lang } = props;
    const blog = process.env.GATSBY_BUILD_BLOG;
    const blogPath = process.env.GATSBY_BLOG_PATH;
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const [active, setActive] = useState(false);
    const [showLangSwitcher, setShowLangSwitcher] = useState(true);
    const [searchQueryString, setSearchQueryString] = useState('');
    const node = useRef();
    useEffect(() => {
        typeof document !== `undefined` &&
            window.location.search.includes('?s=') &&
            setSearchQueryString(window.location.search);

        typeof document !== `undefined` &&
            window.location.search.includes('preview=true') &&
            setShowLangSwitcher(false);
        // add when mounted
        typeof document !== `undefined` && document.addEventListener('mousedown', handleClick);
        // return function to be called when unmounted
        return () => {
            typeof document !== `undefined` &&
                document.removeEventListener('mousedown', handleClick);
        };
    }, [showLangSwitcher]);
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setActive(false);
    };
    //const classes = useStyles(locale);
    const ToggleMenu = () => {
        setActive(!active);
        if (typeof document !== `undefined`) {
            !active
                ? document.body.classList.add(`panelFirst`)
                : document.body.classList.remove(`panelFirst`);
        }
    };
    return (
        <header>
            {isMobile ? (
                <div className={`${`mobileHeader`} ${active ? `panelIsOpen` : ''}`} ref={node}>
                    <BayutLogo lang={lang} />
                    <a href={`${blogPath}${locale === 'ar' ? `ar/` : ``}`} className="anchor">
                        {blog === 'buildings' && (
                            <picture className="locationLogoMobile">
                                <img
                                    src={locale === 'en_US' ? buildingGuidesEn : buildingGuidesAr}
                                    alt="Buildings"
                                />
                            </picture>
                        )}
                        {blog === 'area-guide' && (
                            <picture className="locationLogoMobile">
                                <img
                                    src={locale === 'en_US' ? areaGuidesEn : areaGuidesAr}
                                    alt="Area guides"
                                />
                            </picture>
                        )}
                        {blog === 'schools' && (
                            <picture className="locationLogoMobile">
                                <img
                                    src={locale === 'en_US' ? schoolGuidesEn : schoolGuidesAr}
                                    alt="School Guides"
                                />
                            </picture>
                        )}
                        {blog === 'mybayut' && (
                            <picture className="locationLogoMobile">
                                <img
                                    src={locale === 'en_US' ? myBayutEn : myBayutAr}
                                    alt="mybayut"
                                />
                            </picture>
                        )}
                    </a>
                    <div
                        role="button"
                        className="menuToggle"
                        onClick={ToggleMenu}
                        onKeyDown={ToggleMenu}
                        tabIndex={0}
                    >
                        <span></span>
                    </div>
                    <div className={`${`mobilePanel`} ${active ? `panelOpen` : `panelClose`}`}>
                        <div className="headerSub borderBottom">
                            <div className="container headerContainer">
                                <CategoryNav lang={lang} />
                                <SearchBar lang={lang} />
                            </div>
                        </div>
                        <div className="headerMain borderBottom">
                            <div className="container headerContainer">
                                <NavBar lang={lang} />
                                {translations &&
                                    translations.map(translate => {
                                        if (translate.language) {
                                            const linkArabic =
                                                translate.language.locale === 'ar' &&
                                                (pageType === 'index' ||  pageType === 'search' || pageType === 'preview')
                                                     ? `${blogPath}ar/`
                                                    : `${blogPath}ar/${decodeURI(translate.slug)}/`;
                                            const linkEnglish =
                                                translate.language.locale === 'en_US' &&
                                                (pageType === 'index' || pageType === 'search' || pageType === 'preview')
                                                    ? `${blogPath}`
                                                    : `${blogPath}${translate.slug}/`;
                                            if (
                                                pageType === 'category'
                                                    ? translate.parentId === null || translate.count
                                                        ? true
                                                        : false
                                                    : true
                                            )
                                                return (
                                                    <a
                                                        key={`${translate.slug}`}
                                                        href={
                                                            translate.language.locale === 'ar'
                                                                ? `${linkArabic}${searchQueryString}`
                                                                : `${linkEnglish}${searchQueryString}`
                                                        }
                                                        className="langSwitcher"
                                                    >
                                                        {translate.language.locale === 'ar' ? (
                                                            <span className="alArabia">
                                                                العربية
                                                            </span>
                                                        ) : (
                                                            <span className="english">English</span>
                                                        )}
                                                    </a>
                                                );
                                        }
                                        return null;
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="desktopHeader">
                    <div className="headerMain borderBottom">
                        <div className="container headerContainer">
                            <BayutLogo lang={lang} />
                            <NavBar lang={lang} />
                            {showLangSwitcher &&
                                translations &&
                                translations.map(translate => {
                                    if (translate.language && translate.language.locale === 'ar') {
                                        if (
                                            pageType === 'category'
                                                ? translate.parentId === null || translate.count
                                                    ? true
                                                    : false
                                                : true
                                        )
                                            return (
                                                <a
                                                    key={`${blogPath}${translate.slug}`}
                                                    href={
                                                        (pageType === 'index' || pageType === 'search' || pageType === 'preview')
                                                            ? `${blogPath}ar/${searchQueryString}`
                                                            : `${blogPath}ar/${decodeURI(
                                                                  translate.slug,
                                                              )}/${searchQueryString}`
                                                    }
                                                    className="anchor"
                                                >
                                                    <span className="alArabia">العربية</span>
                                                </a>
                                            );
                                    } else if (
                                        translate.language &&
                                        translate.language.locale === 'en_US'
                                    ) {
                                        if (
                                            pageType === 'category'
                                                ? translate.parentId === null || translate.count
                                                    ? true
                                                    : false
                                                : true
                                        )
                                            return (
                                                <a
                                                    key={`${translate.slug}`}
                                                    href={
                                                        (pageType === 'index' || pageType === 'search' || pageType === 'preview')
                                                            ? `${blogPath}${searchQueryString}`
                                                            : `${blogPath}${translate.slug}/${searchQueryString}`
                                                    }
                                                    className="anchor"
                                                >
                                                    <span className="english">English</span>
                                                </a>
                                            );
                                    }
                                    return null;
                                })}
                        </div>
                    </div>
                    <div className="headerSub">
                        <div className="container headerContainer">
                            <div className="sectionLogo" ref={node}>
                                <a
                                    href={`${blogPath}${locale === 'ar' ? `ar/` : ``}`}
                                    className="anchor"
                                >
                                    {blog === 'buildings' && (
                                        <picture>
                                            <img
                                                src={
                                                    locale === 'en_US'
                                                        ? buildingGuidesEn
                                                        : buildingGuidesAr
                                                }
                                                alt="Buildings"
                                            />
                                        </picture>
                                    )}
                                    {blog === 'area-guide' && (
                                        <picture>
                                            <img
                                                src={
                                                    locale === 'en_US' ? areaGuidesEn : areaGuidesAr
                                                }
                                                alt="Area guides"
                                            />
                                        </picture>
                                    )}
                                    {blog === 'schools' && (
                                        <picture>
                                            <img
                                                src={
                                                    locale === 'en_US'
                                                        ? schoolGuidesEn
                                                        : schoolGuidesAr
                                                }
                                                alt="School guides"
                                            />
                                        </picture>
                                    )}
                                    {blog === 'mybayut' && (
                                        <picture>
                                            <img
                                                src={locale === 'en_US' ? myBayutEn : myBayutAr}
                                                alt="mybayut"
                                            />
                                        </picture>
                                    )}
                                </a>
                                <svg
                                    className={`${`dropdownArrow`} ${active ? `arrowFlip` : ''}`}
                                    onClick={() => setActive(!active)}
                                    onKeyDown={() => setActive(!active)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 12 7"
                                    fill="#222222"
                                    width="12px"
                                >
                                    <path d="M1 0a1 1 0 0 1 .71.29L6 4.59l4.29-4.3A1 1 0 0 1 11.7 1.7l-5 5a1 1 0 0 1-1.41 0l-5-5A1 1 0 0 1 1 0z"></path>
                                </svg>
                                <div
                                    className={`${`dropdownContent`} ${
                                        active ? `dropdownOpen` : ''
                                    }`}
                                >
                                    <div className="triangle"></div>
                                    <ul>
                                        {blog !== 'buildings' && (
                                            <li>
                                                <a
                                                    href={`/buildings/${
                                                        locale === 'ar' ? `ar/` : ``
                                                    }`}
                                                    className="anchor"
                                                >
                                                    <picture>
                                                        <img
                                                            src={
                                                                locale === 'en_US'
                                                                    ? buildingGuidesEn
                                                                    : buildingGuidesAr
                                                            }
                                                            alt="Buildings"
                                                        />
                                                    </picture>
                                                </a>
                                            </li>
                                        )}
                                        {blog !== 'area-guides' && (
                                            <li>
                                                <a
                                                    href={`/area-guides/${
                                                        locale === 'ar' ? `ar/` : ``
                                                    }`}
                                                    className="anchor"
                                                >
                                                    <picture>
                                                        <img
                                                            src={
                                                                locale === 'en_US'
                                                                    ? areaGuidesEn
                                                                    : areaGuidesAr
                                                            }
                                                            alt="Area Guides"
                                                        />
                                                    </picture>
                                                </a>
                                            </li>
                                        )}
                                        {blog !== 'schools' && (
                                            <li className="schoolGuide">
                                                <a
                                                    href={`/schools/${
                                                        locale === 'ar' ? `ar/` : ``
                                                    }`}
                                                    className="anchor"
                                                >
                                                    <picture>
                                                        <img
                                                            src={
                                                                locale === 'en_US'
                                                                    ? schoolGuidesEn
                                                                    : schoolGuidesAr
                                                            }
                                                            alt="School Guides"
                                                        />
                                                    </picture>
                                                </a>
                                            </li>
                                        )}
                                        {blog !== 'mybayut' && (
                                            <li>
                                                <a
                                                    href={`/mybayut/${
                                                        locale === 'ar' ? `ar/` : ``
                                                    }`}
                                                    className="anchor"
                                                >
                                                    <picture>
                                                        <img
                                                            className="myBayut"
                                                            src={
                                                                locale === 'en_US'
                                                                    ? myBayutEn
                                                                    : myBayutAr
                                                            }
                                                            alt="mybayut"
                                                        />
                                                    </picture>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <CategoryNav lang={lang} />
                            <SearchBar lang={lang} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

Header.defaultProps = {
    isIndex: false,
};
Header.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default Header;
