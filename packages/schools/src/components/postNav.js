import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import scrollTo from 'shared-ui/core/helpers/scroll';
import 'schools/src/styles/components/postNav.scss';

const PostNav = props => {
    const { title,lang} = props;
    let locationTitle = title.substr(0, title.indexOf(',')) || title.substr(0, title.indexOf('،'));
    const locale =
        lang === 'ar'
            ? require('schools/src/locales/ar/translations.json')
            : require('schools/src/locales/en-US/translations.json');
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const y = isMobile ? 120 : 50;
    let menuItems = [ {sectionId: "overview", title: locale.postNav.overview},
   {sectionId: "ratings", title: locale.postNav.ratings},
   {sectionId: "admission", title: locale.postNav.admission},
   {sectionId: "facilities", title: locale.postNav.facilities},
   {sectionId: "contact", title: locale.postNav.contact}];
    useEffect(() => {
        const links = Array.prototype.slice.call(document.getElementsByClassName('menuLinks'));
        let sectionOffSets = links.map(entry =>
            document.getElementById(entry.getAttribute('href'))
                ? document.getElementById(entry.getAttribute('href')).offsetTop - y
                : 0,
        );
        links &&
            links.forEach(entry => {
                entry.addEventListener('click', function(e) {
                    e.preventDefault();
                    var elementPosition = document.getElementById(entry.getAttribute('href'))
                        ? document.getElementById(entry.getAttribute('href')).offsetTop
                        : 0;
                    scrollTo(document.documentElement, elementPosition - y, 500);
                });
            });
        const header = document.getElementById('stickyHeader');
        const stickyPoint = header ? header.offsetTop : 0;

        const scrollCallBack = window.addEventListener('scroll', () => {
            if (
                window.pageYOffset >= sectionOffSets[0] - 5 && sectionOffSets[0]!==0 &&
                window.pageYOffset < sectionOffSets[1] - 5
            ) {
                links[0] && links[0].classList.add('active');
                links[1] && links[1].classList.remove('active');
                links[2] && links[2].classList.remove('active');
                links[3] && links[3].classList.remove('active');
                links[4] && links[4].classList.remove('active');
            } else if (
                window.pageYOffset >= sectionOffSets[1] - 5 && sectionOffSets[1]!==0 &&
                window.pageYOffset < sectionOffSets[2] - 5
            ) {
                links[1] && links[1].classList.add('active');
                links[0] && links[0].classList.remove('active');
                links[2] && links[2].classList.remove('active');
                links[3] && links[3].classList.remove('active');
                links[4] && links[4].classList.remove('active');
            }else if (
                window.pageYOffset >= sectionOffSets[2] - 5 && sectionOffSets[2]!==0 &&
                window.pageYOffset < sectionOffSets[3] - 5
            ) {
                links[2] && links[2].classList.add('active');
                links[0] && links[0].classList.remove('active');
                links[1] && links[1].classList.remove('active');
                links[3] && links[3].classList.remove('active');
                links[4] && links[4].classList.remove('active');
            }else if (
                window.pageYOffset >= sectionOffSets[3] - 5 && sectionOffSets[3]!==0 &&
                window.pageYOffset < sectionOffSets[4] - 5
            ) {
                links[3] && links[3].classList.add('active');
                links[0] && links[0].classList.remove('active');
                links[1] && links[1].classList.remove('active');
                links[2] && links[2].classList.remove('active');
                links[4] && links[4].classList.remove('active');
            } else if (window.pageYOffset >= sectionOffSets[sectionOffSets.length - 1] - 5 && sectionOffSets[4]!==0) {
                links[sectionOffSets.length - 1] &&
                links[sectionOffSets.length - 1].classList.add('active');
                links[0] && links[0].classList.remove('active');
                links[1] && links[1].classList.remove('active');
                links[2] && links[2].classList.remove('active');
                links[3] && links[3].classList.remove('active');
            }
            if (window.pageYOffset >= stickyPoint) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
        return () => {
            window.removeEventListener('scroll', scrollCallBack);
        };
    }, [y]);
    return (
        <div className="postNavPlaceHolder">
            <nav id="stickyHeader" className="postNavigation">
                <div className="locationTitle" title={locationTitle}>
                    {locationTitle || title}
                </div>
                <ul className="postNavContainer">
                    {menuItems.map((value, index) => {
                        return (
                            <li key={index}>
                                <a href={value.sectionId || ''} class="menuLinks">
                                    {value.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
export default PostNav;
