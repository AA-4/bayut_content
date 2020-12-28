import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { bayutLogo, bayutLogoAr, bayutMobileLogo } from 'shared-ui/core/images';
import 'shared-ui/core/styles/components/BayutLogo.scss';

const BayutLogo = ({ lang }) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    return (
        <a href={`https://www.bayut.com/${lang === 'ar' ? `ar/` : ``}`} className="anchor left">
            <picture className="headerLogo">
                <img
                    src={isMobile ? bayutMobileLogo : lang === 'ar' ? bayutLogoAr : bayutLogo}
                    alt="Bayut Logo"
                />
            </picture>
        </a>
    );
};
BayutLogo.propTypes = {
    lang: PropTypes.string.isRequired,
};
export default BayutLogo;
