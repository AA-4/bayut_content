import 'cypress-xpath';
import functions from './../../support/functions.js';
describe('View All Buttons on Home Page', () => {
    it('visit website', () => {
        cy.visit('/buildings/');
    });

    it('Traverse through View All Buttons on Home Page', () => {
        const func = new functions();
        cy.get('.listings').then($lengths => {
            var len = $lengths.length;
            var j = Array.from(Array(len), (_, i) => i + 1);
            j.forEach(function(name) {
                cy.xpath('//div[@class="listings indexListings"][' + name + ']/a').then(
                    $btnText => {
                        var txt = $btnText.text();
                        var upper = func.getTextForButtonHeading(txt);
                        cy.xpath(`//div[@class="listings indexListings"][${name}]/a`).click({
                            force: true,
                        });
                        cy.xpath('//h1').then($heading1 => {
                            cy.waitUntil(() => expect($heading1.text()).to.eq(upper));
                            var res = func.getURLTextforButtons(upper);
                            cy.url().should('include', '/' + res + '/');
                            cy.xpath('//a[@href="/buildings/"]').click({ force: true });
                        });
                    },
                );
            });
        });
    });
});
