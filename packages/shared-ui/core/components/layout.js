import React from 'react';
import PropTypes from 'prop-types';
import { Header, Footer, SEO } from 'shared-ui/core/components';
import  { Helmet }  from 'react-helmet';
import 'shared-ui/core/styles/components/layout.scss';

const Layout = props => {
    const { children, data, lang } = props;
    const {
        language: { locale },
    } = data;
    const pageType = data.type;
    return (
        <div>
            <Helmet defer={false}>
                <html lang="en" dir="ltr" className="html" />
                <body className="body" />
                <link rel="preconnect" href="https://agmcdn.bayut.com" />
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://connect.facebook.net" />
                <link rel="preconnect" href="https://stats.g.doubleclick.net" />
                <noscript>{`<link rel="stylesheet" type="text/css" href="https://agmcdn.bayut.com/gatsby/noscript_stage_02.css" />`}</noscript>
            </Helmet>
            <SEO data={data} />
            <div className="documentWrap">
                <Header
                    translations={data.translations}
                    pageType={pageType}
                    locale={locale}
                    lang={lang}
                />
                <main className="mainWrap">{children}</main>
                <Footer lang={lang} />
            </div>
            </div>
    );
};

Layout.defaultProps = {
    data: { seo: { title: 'Page Not Found | Bayut' }, language: { locale: 'en_US' } },
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
};

export default Layout;
