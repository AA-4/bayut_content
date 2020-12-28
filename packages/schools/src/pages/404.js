import React, { useState, useEffect } from 'react';
import { Layout, Spinner } from 'shared-ui/core/components';

const NotFoundPage = ({ location }) => {
    const [spinnerClass, setSpinnerClass] = useState('show');
    const [layoutClass, setLayoutClass] = useState('hide');
    const lang = location.pathname.includes('/ar/') ? 'ar' : 'en';
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    let _language = 'en_US';
    if (lang === 'ar') {
        _language = 'ar';
    }
    useEffect(() => {
        setSpinnerClass('hide');
        setLayoutClass('show');
    }, []);
    return (
        <>
            <div className={spinnerClass}>
                <Spinner></Spinner>
            </div>
            <div className={layoutClass}>
                <Layout data={{ language: { locale: _language } }} lang={lang}>
                    <div className="container errorPage">
                        <h1 className="pageTitle">{locale.P404.title}</h1>
                        <p>{locale.P404.description}</p>
                    </div>
                </Layout>
            </div>
        </>
    );
};

export default NotFoundPage;
