import seoFunctions from './../../support/seoFunctions.js';
const seo = new seoFunctions();
describe('Category Page Seo', () => {
    let Data;
    beforeEach(function() {
        cy.fixture('schools').then(function(data) {
            Data = data;
        });
    });

    it('visit website', () => {
        cy.visit('/schools/dubai/');
    });

    it('Get Title', () => {
        seo.checkTitle(Data.CategoryPageTitle);
    });

    it('Get Description', () => {
        seo.checkDescription(Data.CategoryPageDescription);
    });

    it('Get Canonical', () => {
        seo.checkCanonical(Data.CategoryPageEngURL);
    });

    it('Get Hreflang Tag Eng', () => {
        seo.checkHrefEng(Data.CategoryPageEngURL);
    });

    it('Get Hreflang Tag Ar', () => {
        seo.checkHrefAr(Data.CategoryPageArURL);
    });

    it('Check Each img has alt tag', () => {
        seo.checkAltTag();
    });

    it('Get Open Graph URL', () => {
        seo.checkOpenGraphURL(Data.CategoryPageEngURL);
    });

    it('Get Open Graph Type', () => {
        seo.checkOpenGraphType('object');
    });

    it('Get Open Graph locale', () => {
        seo.checkOpenGraphLocale();
    });

    it('Get Open Graph locale Alternate', () => {
        seo.checkOpenGraphLocaleAlt();
    });

    it('Get Open Graph title', () => {
        seo.checkOpenGraphTitle(Data.CategoryPageTitle);
    });

    it('Get Open Graph description', () => {
        seo.checkOpenGraphDescription(Data.CategoryPageDescription);
    });

    it('Get Open Graph site name', () => {
        seo.checkOpenGraphSiteName(Data.HomePageTitle);
    });

    it('Get twitter card', () => {
        seo.checkTwitterCard();
    });

    it('Get twitter description', () => {
        seo.checkTwitterDescription(Data.CategoryPageDescription);
    });

    it('Get twitter title', () => {
        seo.checkTwitterTitle(Data.CategoryPageTitle);
    });
});