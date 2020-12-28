import '../../support/node_modules/cypress-xpath';
import functions from '../../support/functions.js';
describe('Location on Header', () => {
    it('visit website', () => {
        cy.visit('/buildings/');
    });

    it('Traverse through all Loc level 2 locations on header', () => {
        const func = new functions();
        cy.xpath('//nav[@class="subNavigation"]/a').then($lengths => {
            var len = $lengths.length;
            var j = Array.from(Array(len), (_, i) => i + 1);
            j.forEach(function(name) {
                cy.xpath(`//nav[@class="subNavigation"]/a[${name}]`).then($locText => {
                    const txt = $locText.text();
                    var uppertxt = func.capitalize(txt);
                    cy.xpath(`//nav[@class="subNavigation"]/a[${name}]`).click({ force: true });
                    cy.xpath('//div[@role="presentation"]/span').should(
                        'have.text',
                        'View All Locations',
                    );
                    cy.xpath('//h1').then($heading1 => {
                        const h1 = $heading1.text();
                        var h1txt = h1.slice(13);
                        expect(h1txt).to.eq(uppertxt);
                        var res = func.getURLTextforHeaderLoc(h1txt);
                        cy.url().should('include', '/' + res + '/');
                        cy.xpath('//a[@href="/buildings/"]').click({ force: true });
                    });
                });
            });
        });
    });
});