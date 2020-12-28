import seoFunctions from './../../support/seoFunctions.js';
const seo = new seoFunctions();
describe('Home Page Seo', () => {
    let Data;
    beforeEach(function() {
        cy.fixture('buildings').then(function(data) {
            Data = data;
        });
    });

    it('visit website', () => {
        cy.visit('/buildings/');
    });

    it('Get Title', () => {
        seo.checkTitle(Data.HomePageTitle);
    });

    it('Get Description', () => {
        seo.checkDescription(Data.HomePageDescription);
    });

    it('Get Canonical', () => {
        seo.checkCanonical(Data.HomePageEngURL);
        cy.get('link[rel="canonical"]').should('have.attr', 'href', Data.HomePageEngURL);
    });

    it('Get Hreflang Tag Eng', () => {
        seo.checkHrefEng(Data.HomePageEngURL);
    });

    it('Get Hreflang Tag Ar', () => {
        seo.checkHrefAr(Data.HomePageArURL);
    });

    it('Check Each img has alt tag', () => {
        seo.checkAltTag();
    });

    it('Get Open Graph URL', () => {
        seo.checkOpenGraphURL(Data.HomePageEngURL);
    });

    it('Get Open Graph Type', () => {
        seo.checkOpenGraphType('website');
    });

    it('Get Open Graph locale', () => {
        seo.checkOpenGraphLocale();
    });

    it('Get Open Graph locale Alternate', () => {
        seo.checkOpenGraphLocaleAlt();
    });

    it('Get Open Graph title', () => {
        seo.checkOpenGraphTitle(Data.HomePageTitle);
    });

    it('Get Open Graph description', () => {
        seo.checkOpenGraphDescription(Data.HomePageDescription);
    });

    it('Get Open Graph site name', () => {
        seo.checkOpenGraphSiteName(Data.HomePageTitle);
    });

    it('Get twitter card', () => {
        seo.checkTwitterCard();
    });

    it('Get twitter description', () => {
        seo.checkTwitterDescription(Data.HomePageDescription);
    });

    it('Get twitter title', () => {
        seo.checkTwitterTitle(Data.HomePageTitle);
    });
});