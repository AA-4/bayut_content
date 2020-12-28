import React from 'react';
import PropTypes from 'prop-types';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import {
    facebook,
    instagram,
    linkedIn,
    twitter,
    pixel,
    googlePlayEN,
    appStoreEN,
    googlePlayAR,
    appStoreAR,
} from 'shared-ui/core/images';
import 'shared-ui/core/styles/components/socialMediaLinks.scss';

const SocialMediaLinks = ({ lang }) => {
    const isJsEnabled = useIsJsEnabled();
    return (
        <div className="socialLinks">
            <ul>
                <li>
                    <a href="https://www.facebook.com/bayutuae" className="anchor">
                        <img
                            src={isJsEnabled ? pixel : facebook}
                            data-src={facebook}
                            alt="Facebook"
                            className="lazyload"
                        />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/bayutuae/" className="anchor">
                        <img
                            src={isJsEnabled ? pixel : instagram}
                            data-src={instagram}
                            alt="Instagram"
                            className="lazyload"
                        />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/bayut-com" className="anchor">
                        <img
                            src={isJsEnabled ? pixel : linkedIn}
                            data-src={linkedIn}
                            alt="LinkedIn"
                            className="lazyload"
                        />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/bayut" className="anchor">
                        <img
                            src={isJsEnabled ? pixel : twitter}
                            data-src={twitter}
                            alt="Twitter"
                            className="lazyload"
                        />
                    </a>
                </li>
            </ul>
            <ul>
                <li className="appStore">
                    <a href="https://itunes.apple.com/app/bayut-uae-property-search/id923263211?mt=8">
                        <img
                            src={isJsEnabled ? pixel : lang === 'en' ? appStoreEN : appStoreAR}
                            data-src={lang === 'en' ? appStoreEN : appStoreAR}
                            alt="app store"
                            className="lazyload"
                        />
                    </a>
                </li>
                <li className="googlePlay">
                    <a href="https://play.google.com/store/apps/details?id=com.bayut.bayutapp">
                        <img
                            src={isJsEnabled ? pixel : lang === 'en' ? googlePlayEN : googlePlayAR}
                            data-src={lang === 'en' ? googlePlayEN : googlePlayAR}
                            alt="Google play"
                            className="lazyload"
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};
SocialMediaLinks.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default SocialMediaLinks;
