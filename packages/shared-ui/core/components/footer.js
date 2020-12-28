import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SocialMediaLinks from './socialMediaLinks';
import scrollTo from 'shared-ui/core/helpers/scroll';
import 'shared-ui/core/styles/components/footer.scss';

const Footer = props => {
    const { language, lang } = props;
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    useEffect(() => {
        const topArrow = typeof document !== 'undefined' && document.getElementById('topArrow');
        const scrollCallBack = window.addEventListener('scroll', () => {
            if (window.pageYOffset > 110) {
                topArrow.classList.add(`show`);
            } else {
                topArrow.classList.remove(`show`);
            }
        });
        return () => {
            window.removeEventListener('scroll', scrollCallBack);
        };
    }, []);
    return (
        <footer className="footer">
            <div className="container">
                <div className="footerLinks">
                    <ul className="footerMenu">
                        <li>
                            <a
                                href={`${language === 'ar' ? `/ar` : ``}/about/aboutus.html`}
                                className="anchor"
                            >
                                {locale.footer.about_us}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`${language === 'ar' ? `/ar` : ``}/contactus.html`}
                                className="anchor"
                            >
                                {locale.footer.contact_us}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`${language === 'ar' ? `/ar` : ``}/terms.html`}
                                className="anchor"
                            >
                                {locale.footer.terms_and_policy}
                            </a>
                        </li>
                    </ul>
                    <SocialMediaLinks lang={lang} />
                </div>
            </div>
            <div className="footerBottom">
                <div className="container">
                    <span className="copyRight">
                        © {new Date().getFullYear()} {locale.copyright_text}
                    </span>
                </div>
            </div>
            <div
                id="topArrow"
                role="presentation"
                className="scrollToTop"
                onClick={() => scrollTo(document.documentElement, 0, 500)}
                onKeyDown={() => scrollTo(document.documentElement, 0, 500)}
            ></div>
        </footer>
    );
};
Footer.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default Footer;
