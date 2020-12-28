import React from 'react';
import { Layout } from 'shared-ui/core/components';

const IndexPage = () => {
    return (
        <Layout data={{ language: { locale: 'en_US' } }} lang="en">
            <div className="container errorPage">
                <h1 className="pageTitle">Cornerstone Landing Page</h1>
                <h3>This page will not be served on production.</h3>
            </div>
        </Layout>
    );
};

export default IndexPage;
