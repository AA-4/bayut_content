import seoFunctions from './../../support/seoFunctions.js';
import basicFunctions from './../../support/basicFunctions.js';
const locators = require('./../../support/locators.js');
const seo = new seoFunctions();
const basic = new basicFunctions();
describe('Pagination Seo', () => {
    let Data;
    beforeEach(function() {
        cy.fixture('buildings').then(function(data) {
            Data = data;
        });
    });
    it('visit website', () => {
        cy.visit('/buildings/dubai/');
    });

    it('Get next tag on the first page', () => {
        seo.checkNextTag(Data.NextPageURL);
    });

    it('Check there is no prev tag on the first page', () => {
        seo.checkPrevTagDoesNotExist();
    });

    it('Get next tag on the next page', () => {
        basic.clickButtonUsingXpath(locators.paths.next_button);
        seo.checkNextTag(Data.NexttoNextPageURL);
    });

    it('Get prev tag on the next page', () => {
        seo.checkPrevTag(Data.CategoryPageEngURL);
    });
    it('Get prev tag on the last page', () => {
        seo.checkPrevTagURL(locators.paths.last_page);
    });

    it('Check there is no next tag on the last page', () => {
        seo.checkNextTagDoesNotExist();
    });
});
