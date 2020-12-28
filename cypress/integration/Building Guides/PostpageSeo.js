import seoFunctions from './../../support/seoFunctions.js';
const seo = new seoFunctions();
describe('Post Page Seo', () => {
    let Data;
    beforeEach(function() {
        cy.fixture('buildings').then(function(data) {
            Data = data;
        });
    });

    it('visit website', () => {
        cy.visit('/buildings/cluster-c/');
    });

    it('Get Title', () => {
        seo.checkTitle(Data.PostPageTitle);
    });

    it('Get Description', () => {
        seo.checkDescription(Data.PostPageDescription);
    });

    it('Get Canonical', () => {
        seo.checkCanonical(Data.PostPageEngURL);
    });

    it('Get Hreflang Tag Eng', () => {
        seo.checkHrefEng(Data.PostPageEngURL);
    });

    it('Get Hreflang Tag Ar', () => {
        seo.checkHrefAr(Data.PostPageArURL);
    });

    it('Check Each img has alt tag', () => {
        seo.checkAltTag();
    });

    it('Get Open Graph URL', () => {
        seo.checkOpenGraphURL(Data.PostPageEngURL);
    });

    it('Get Open Graph Type', () => {
        seo.checkOpenGraphType('article');
    });

    it('Get Open Graph locale', () => {
        seo.checkOpenGraphLocale();
    });

    it('Get Open Graph locale Alternate', () => {
        seo.checkOpenGraphLocaleAlt();
    });

    it('Get Open Graph title', () => {
        seo.checkOpenGraphTitle(Data.PostPageTitle);
    });

    it('Get Open Graph description', () => {
        seo.checkOpenGraphDescription(Data.PostPageDescription);
    });

    it('Get Open Graph site name', () => {
        seo.checkOpenGraphSiteName(Data.HomePageTitle);
    });

    it('Get twitter card', () => {
        seo.checkTwitterCard();
    });

    it('Get twitter description', () => {
        seo.checkTwitterDescription(Data.PostPageDescription);
    });

    it('Get twitter title', () => {
        seo.checkTwitterTitle(Data.PostPageTitle);
    });
});