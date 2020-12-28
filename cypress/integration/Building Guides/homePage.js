import 'cypress-xpath';
// import functions from './functions.js'
// import selectors from './selectors.js'
var j = new Array(1, 2, 3);

describe('Posts on Home Page', () => {
    // const func = new functions()
    // const sel = new selectors()
    it('visit website', () => {
        cy.visit('/buildings/');
    });

    it('Traverse through all home page posts', () => {
        cy.get('.listings').then($lengths2 => {
            var len2 = $lengths2.length;
            var k = Array.from(Array(len2), (_, i) => i + 1);
            console.log(k);
            k.forEach(function(name) {
                j.forEach(function(step) {
                    cy.xpath(
                        `//div[@class="listings indexListings"][${name}]/div[@class="listItem"][${step}]`,
                    ).then($postTitle => {
                        const txt = $postTitle.text();
                        cy.xpath(
                            `//div[@class="listings indexListings"][${name}]/div[@class="listItem"][${step}]/a`,
                        ).click({ force: true });
                        cy.xpath('//h1').then($heading1 => {
                            cy.waitUntil(() => expect($heading1.text()).to.eq(txt));
                            cy.xpath('//a[@href="/buildings/"]').click({ force: true });
                        });
                    });
                });
            });
        });
    });
});