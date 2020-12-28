import 'cypress-xpath';
class general {
    clickButtonUsingXpath(xpath) {
        cy.xpath(xpath).click();
    }

    assertUsingURL(url) {
        cy.url().should('include', url);
    }

    assertXpathDoesNotExist(xpath) {
        cy.xpath(xpath).should('not.exist');
    }

    assertUsingAttribute(selector, attribute, text) {
        cy.get(selector).should('have.attr', attribute, text);
    }
    assertUsingMultipleAttribute(selector, attr1, text1, attr2, text2) {
        cy.get(selector)
            .should('have.attr', attr1, text1)
            .and('have.attr', attr2, text2);
    }
    assertUsingMultipleAttributeAndIndex(selector, index, attr1, text1, attr2, text2) {
        cy.get(selector)
            .eq(index)
            .should('have.attr', attr1, text1)
            .and('have.attr', attr2, text2);
    }
    travereSelectorUsingAttribute(selector, attr) {
        cy.get(selector).each($el => {
            cy.wrap($el).should('have.attr', attr);
        });
    }
    pathShouldNotExist(selector) {
        cy.get(selector).should('not.exist');
    }
}
export default general;