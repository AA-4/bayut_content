const locators = require('../support/locators.js');
import functions from '../support/basicFunctions.js';
const func = new functions();
class seo {
    checkTitle(title) {
        cy.title().should('eq', title);
    }

    checkDescription(description) {
        func.assertUsingAttribute(
            locators.paths.description,
            locators.paths.attr_content,
            description,
        );
    }
    checkCanonical(canonical) {
        func.assertUsingAttribute(locators.paths.canonical, locators.paths.attr_href, canonical);
    }

    checkHrefEng(hrefEng) {
        func.assertUsingMultipleAttribute(
            locators.paths.alternate,
            locators.paths.attr_href,
            hrefEng,
            locators.paths.attr_href_lang,
            locators.paths.eng,
        );
    }

    checkHrefAr(hrefAr) {
        func.assertUsingMultipleAttributeAndIndex(
            locators.paths.alternate,
            '1',
            locators.paths.attr_href,
            hrefAr,
            locators.paths.attr_href_lang,
            locators.paths.arb,
        );
    }

    checkAltTag() {
        func.travereSelectorUsingAttribute(locators.paths.image, locators.paths.attr_alt);
    }

    checkOpenGraphURL(ogUrl) {
        func.assertUsingAttribute(locators.paths.og_url, locators.paths.attr_content, ogUrl);
    }

    checkOpenGraphType(type) {
        func.assertUsingAttribute(locators.paths.og_type, locators.paths.attr_content, type);
    }

    checkOpenGraphLocale() {
        func.assertUsingAttribute(
            locators.paths.og_locale,
            locators.paths.attr_content,
            locators.paths.eng_lang,
        );
    }

    checkOpenGraphLocaleAlt() {
        func.assertUsingAttribute(
            locators.paths.og_locale_alt,
            locators.paths.attr_content,
            locators.paths.arb_lang,
        );
    }

    checkOpenGraphTitle(ogTitle) {
        func.assertUsingAttribute(locators.paths.og_title, locators.paths.attr_content, ogTitle);
    }

    checkOpenGraphDescription(ogDescription) {
        func.assertUsingAttribute(
            locators.paths.og_description,
            locators.paths.attr_content,
            ogDescription,
        );
    }

    checkOpenGraphSiteName(ogSiteName) {
        func.assertUsingAttribute(
            locators.paths.og_sitename,
            locators.paths.attr_content,
            ogSiteName,
        );
    }

    checkTwitterCard() {
        func.assertUsingAttribute(
            locators.paths.twitter_card,
            locators.paths.attr_content,
            locators.paths.twitter_content,
        );
    }

    checkTwitterDescription(twitterDescription) {
        func.assertUsingAttribute(
            locators.paths.twitter_description,
            locators.paths.attr_content,
            twitterDescription,
        );
    }

    checkTwitterTitle(twitterTitle) {
        func.assertUsingAttribute(
            locators.paths.twitter_title,
            locators.paths.attr_content,
            twitterTitle,
        );
    }

    checkNextTag(nextTag) {
        func.assertUsingAttribute(locators.paths.next, locators.paths.attr_href, nextTag);
    }

    checkNextTagDoesNotExist() {
        func.pathShouldNotExist(locators.paths.next);
    }

    checkPrevTag(prevTag) {
        func.assertUsingAttribute(locators.paths.prev, locators.paths.attr_href, prevTag);
    }

    checkPrevTagDoesNotExist() {
        func.pathShouldNotExist(locators.paths.prev);
    }

    checkPrevTagURL(xpath) {
        cy.xpath(xpath).then($lengths => {
            var num = $lengths.text();
            var previous = num - 1;
            cy.xpath(xpath).click();
            cy.get('link[rel="prev"]').should(
                'have.attr',
                'href',
                `https://www.bayut.com/buildings/dubai/page/${previous}/`,
            );
        });
    }
}
export default seo;