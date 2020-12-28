const locators = require('../../support/locators.js');
import basicFunctions from '../../support/basicFunctions.js';
const basic = new basicFunctions();
import 'cypress-xpath';
describe('Pagination', () => {
    let Data;
    let prev;
    it('visit website', () => {
        cy.visit('/buildings/dubai/');
    });

    it('check there is no prev button on the first page', () => {
        basic.assertXpathDoesNotExist(locators.paths.prev_button);
    });

    it('click next button on first page', () => {
        basic.clickButtonUsingXpath(locators.paths.next_button);
        basic.assertUsingURL(locators.paths.second_page);
    });

    it('click prev button on second page', () => {
        basic.clickButtonUsingXpath(locators.paths.prev_button);
        basic.assertUsingURL(locators.paths.dubai_page);
    });

    it('check there is no next button on last page', () => {
        cy.xpath('//div[@class="pageCycle"]/a[@class="pagesBtn"][3]').then($lengths => {
            Data = $lengths.text();
            prev = Data - 1;
        });
        basic.clickButtonUsingXpath(locators.paths.third_button);
        basic.assertXpathDoesNotExist(locators.paths.next_button);
    });

    it('check prev button on last page', () => {
        basic.clickButtonUsingXpath(locators.paths.prev_button);
        cy.url().should('include', `/page/${prev}/`);
    });
});