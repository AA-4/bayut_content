import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { decodeHTML } from 'shared-ui/core/helpers';
import 'shared-ui/core/styles/components/subCategoryNav.scss';

const SubCategoryNav = ({ categories, parentCategory, lang }) => {
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const blog = process.env.GATSBY_BUILD_BLOG;
    const ToggleMenu = () => {
        setOpen(!open);
        if (typeof document !== `undefined`) {
            !open
                ? document.body.classList.add(`panelFirst`)
                : document.body.classList.remove(`panelFirst`);
        }
    };
    return (
        <>
            {categories && categories.length > 0 && (
                <div className="subCategoryNav">
                    <div className="title">
                        {locale.category.locations_in} {decodeHTML(parentCategory)}
                    </div>
                    <div className="scroller">
                        <ul className={`${`locations`} ${active ? `expanded` : ''}`}>
                            {categories.map(category => {
                                return (
                                    <li className="locName" key={category.name}>
                                        <a
                                            href={`/${blog}/${
                                                lang === 'ar'
                                                    ? `ar/${decodeURI(category.slug)}/`
                                                    : `${category.slug}/`
                                            }`}
                                        >
                                            {decodeHTML(category.name)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        {categories.length > 4 &&
                            (isMobile ? (
                                <div>
                                    <div
                                        role="presentation"
                                        onClick={ToggleMenu}
                                        onKeyDown={ToggleMenu}
                                        className="viewAll"
                                    >
                                        <span>{locale.category.view_all_locations}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                id="Subtraction_2"
                                                data-name="Subtraction 2"
                                                d="M7,14a7,7,0,1,1,7-7A7.008,7.008,0,0,1,7,14ZM2.8,6.476V7.525H9.189L6.26,10.46,7,11.2,11.2,7,7,2.8l-.74.741,2.93,2.935Z"
                                                transform="translate(14) rotate(90)"
                                            />
                                        </svg>
                                    </div>
                                    <div
                                        role="presentation"
                                        className={`${`overlay`} ${open ? `active` : ''}`}
                                        onClick={ToggleMenu}
                                        onKeyDown={ToggleMenu}
                                    ></div>
                                    <div
                                        className={`${`locPanel`} ${
                                            open ? `panelOpen` : `panelClose`
                                        }`}
                                    >
                                        <div className="locPanelHeader">
                                            <svg
                                                version="1.1"
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 32 32"
                                                width="12"
                                                height="12"
                                                onClick={ToggleMenu}
                                                onKeyDown={ToggleMenu}
                                                role="presentation"
                                            >
                                                <path
                                                    id="Path_2000"
                                                    d="M32,3.2L28.8,0L16,12.8L3.2,0L0,3.2L12.8,16L0,28.8L3.2,32L16,19.2L28.8,32l3.2-3.2L19.2,16L32,3.2z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="title">
                                            {locale.category.locations_in}{' '}
                                            {decodeHTML(parentCategory)}
                                        </div>
                                        <ul className="allLocations">
                                            {categories.map(category => {
                                                return (
                                                    <li key={category.name}>
                                                        <a
                                                            href={`/${blog}/${
                                                                lang === 'ar'
                                                                    ? `ar/${decodeURI(
                                                                          category.slug,
                                                                      )}/`
                                                                    : `${category.slug}/`
                                                            }`}
                                                        >
                                                            {decodeHTML(category.name)}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    role="presentation"
                                    onClick={() => setActive(!active)}
                                    onKeyDown={() => setActive(!active)}
                                    className={`${`viewAll`} ${active ? `expanded` : ''}`}
                                >
                                    {active ? (
                                        <span>{locale.category.view_fewer_locations}</span>
                                    ) : (
                                        <span>{locale.category.view_all_locations}</span>
                                    )}

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            id="Subtraction_2"
                                            data-name="Subtraction 2"
                                            d="M7,14a7,7,0,1,1,7-7A7.008,7.008,0,0,1,7,14ZM2.8,6.476V7.525H9.189L6.26,10.46,7,11.2,11.2,7,7,2.8l-.74.741,2.93,2.935Z"
                                            transform="translate(14) rotate(90)"
                                        />
                                    </svg>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};
SubCategoryNav.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default SubCategoryNav;
