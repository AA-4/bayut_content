import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { HomePost } from 'shared-ui/core/components';
import searchIcon from  'schools/src/images/searchIconLarge.svg';
import loadable from '@loadable/component';
const Select = loadable(() => import('react-select'));

const HomePage = props => {
    const {
        data: {
            wpgraphqlschools: { Dubai, DubaiPosts,AbuDhabi,AbuDhabiPosts,Sharjah,SharjahPosts, categories },
            posts,
        },
        lang,
    } = props;
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    let currentLang = 'en_US';
    lang === 'ar' ? (currentLang = 'ar') : (currentLang = 'en_US');

    let searchResults = [];
    categories.nodes.forEach(category => {
        if(category.name !== "Uncategorized"){
            searchResults.push({ value: category.slug, label: category.name });
            const {
                children: { nodes: child_nodes_lv1 },
            } = category;
            child_nodes_lv1.forEach(child_node_lv1 => {
                searchResults.push({ value: child_node_lv1.slug, label: child_node_lv1.name });
                const {
                    children: { nodes: child_nodes_lv2 },
                } = child_node_lv1;
                child_nodes_lv2.forEach(child_node_lv2 => {
                    searchResults.push({ value: child_node_lv2.slug, label: child_node_lv2.name });
                });
            });
        }
    });
    searchResults = searchResults.filter(
        (category, index, self) => index === self.findIndex(t => t.value === category.value),
    );
    const sortedPosts = posts.reverse();
    sortedPosts.forEach(post => {
        if (post.language.locale === currentLang)
            searchResults.push({ value: post.slug, label: post.title });
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
        window.location.href = `${decodeURI(selectedOption.value)}/`;
    };
    const selectStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#888888',
            backgroundColor: state.isSelected ? '#f5f5f5' : '',
            cursor: `pointer`,
            fontSize: `1.6rem`,
            '&:hover': {
                backgroundColor: `#f5f5f5`,
            },
        }),
        container: () => ({
            border: `none`,
            outline: `none`,
            flex: `1`,
            backgroundColor: `transparent`,
            height: `100%`,
        }),
        control: () => ({
            border: `none`,
            display: `flex`,
            alignItems: `center`,
            height: `100%`,
            padding: `0 1rem`,
            boxSizing: `border-box`,
            '&:before': {
                content: `url(${searchIcon})`,
                width: `1.8rem`,
                height: `1.8rem`,
                lineHeight: `1.8rem`,
                cursor: `pointer`,
                display: `inline-block`,
            },
        }),
        menu: () => ({
            marginTop: `0.3rem`,
            width: `100%`,
            backgroundColor: `#ffffff`,
            position: `absolute`,
            left: 0,
            borderRadius: `0.4rem`,
            lineHeight: `1.4`,
            boxShadow: `0 0.3rem 0.6rem 0 rgba(0,0,0,.25)`,
        }),
        indicatorsContainer: () => ({
            display: `none`,
        }),
    };
    return (
        <>
            <div className='buildingGuideCover'>
                <div className='searchBoxWrap'>
                    <h1>{locale.index.schools_cover_index_title}</h1>
                    <div className='searchBox'>
                        <Select
                            className='searchField'
                            value={selectedOption}
                            onChange={handleChange}
                            options={searchResults}
                            placeholder={locale.index.search_placeholder}
                            styles={selectStyles}
                        />
                        <button className='searchBtn' type="submit">
                            {locale.index.search}
                        </button>
                    </div>
                </div>
            </div>

            <div className='container'>
                {Dubai && Dubai.name && (
                    <a
                        className="locationLink"
                        href={`/schools/${
                            lang === 'ar' ? `ar/${decodeURI(Dubai.slug)}` : Dubai.slug
                        }/`}
                    >
                        <h2 className="pageHeading">{Dubai.name}</h2>
                    </a>
                )}
                <div className="listings indexListings">
                    {DubaiPosts.nodes &&
                        DubaiPosts.nodes.map((post, index) => (
                            <HomePost key={post.id} post={post} lazyload={`${index < 2 ? 0 : 1}`} />
                        ))}

                    {Dubai && Dubai.name && (
                        <a
                            className="viewAll"
                            href={`/schools/${
                                lang === 'ar'
                                    ? `ar/${decodeURI(Dubai.slug)}`
                                    : Dubai.slug
                            }/`}
                        >
                            {locale.index.view_all_schools_in} {Dubai.name}
                        </a>
                    )}
                </div>

                {AbuDhabi && AbuDhabi.name && (
                    <a
                        className="locationLink"
                        href={`/schools/${
                            lang === 'ar' ? `ar/${decodeURI(AbuDhabi.slug)}` : AbuDhabi.slug
                        }/`}
                    >
                        <h2 className="pageHeading">{AbuDhabi.name}</h2>
                    </a>
                )}
                <div className="listings indexListings">
                {AbuDhabiPosts.nodes &&
                    AbuDhabiPosts.nodes.map((post, index) => (
                        <HomePost key={post.id} post={post} lazyload={`${index < 2 ? 0 : 1}`} />
                    ))}

                {AbuDhabi && AbuDhabi.name && (
                    <a
                        className="viewAll"
                        href={`/schools/${
                            lang === 'ar'
                                ? `ar/${decodeURI(AbuDhabi.slug)}`
                                : AbuDhabi.slug
                        }/`}
                    >
                        {locale.index.view_all_schools_in} {AbuDhabi.name}
                    </a>
                )}
            </div>
            {Sharjah && Sharjah.name && (
                    <a
                        className="locationLink"
                        href={`/schools/${
                            lang === 'ar' ? `ar/${decodeURI(Sharjah.slug)}` : Sharjah.slug
                        }/`}
                    >
                        <h2 className="pageHeading">{Sharjah.name}</h2>
                    </a>
                )}
                <div className="listings indexListings">
                {SharjahPosts.nodes &&
                    SharjahPosts.nodes.map((post, index) => (
                        <HomePost key={post.id} post={post} lazyload={`${index < 2 ? 0 : 1}`} />
                    ))}

                {Sharjah && Sharjah.name && (
                    <a
                        className="viewAll"
                        href={`/schools/${
                            lang === 'ar'
                                ? `ar/${decodeURI(Sharjah.slug)}`
                                : Sharjah.slug
                        }/`}
                    >
                        {locale.index.view_all_schools_in} {Sharjah.name}
                    </a>
                )}
            </div>
            </div>
        </>
    );
};
HomePage.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default HomePage;
