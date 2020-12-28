import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import parse from 'html-react-parser';
import { decodeHTML } from 'shared-ui/core/helpers';
import config from 'schools/gatsby/config';
import { PostNav } from '../components';
import { useIsJsEnabled } from 'gatsby-plugin-js-fallback';
import scrollTo from 'shared-ui/core/helpers/scroll';

const Post = props => {
    const isJsEnabled = useIsJsEnabled();
    const { postData, lang } = props;
    const { title, content } = postData;
    const {
        blogs: {
            schools: { uploadPath },
        },
    } = config;
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });

    let mediaItemUrl =
        postData.featuredImage != null
            ? postData.featuredImage.node.mediaItemUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : '';
    let featuredImage =
        postData.featuredImage != null
            ? postData.featuredImage.node.sourceUrl.replace(
                  new RegExp(uploadPath.wordpress, 'g'),
                  uploadPath.cdn,
              )
            : '';
    // let srcSet =
    //     postData.featuredImage.node != null
    //         ? postData.featuredImage.srcSet.replace(
    //               new RegExp(uploadPath.wordpress, 'g'),
    //               uploadPath.cdn,
    //           )
    //         : '';

    let updatedContent = content
        ? content.replace(new RegExp(uploadPath.wordpress, 'g'), uploadPath.cdn)
        : '';
    let pageContent = updatedContent
        .replace(new RegExp(/\{"(.*?)\}/, 'g'), '') //Strips Json objects
        .replace(new RegExp('<span</span>', 'g'), '') //strips faulty span tag
        .replace(/>+\s+</g, '><') //strips empty tags
        .replace(/<p>&nbsp;<\/p>/g, '')
        .replace(new RegExp('<style([\\s\\S]+?)</style>', 'g'), '') //strips style tags
        .replace(new RegExp('<gwmw([\\s\\S]+?)</gwmw>', 'g'), ''); //strips gwmw tags

    if (typeof window !== 'undefined') {
        //  To add a class to Total row of table
        let div = document.createElement('div');
        div.innerHTML = updatedContent;
        let rows;
        let seletedClasses = div.getElementsByClassName('datatabletopheadfilled');
        Array.prototype.map.call(seletedClasses, item => {
            rows = item.getElementsByClassName('content');
            if (rows && rows[rows.length - 1]) {
                if (
                    rows[rows.length - 1].innerText.includes('المجموع') ||
                    rows[rows.length - 1].innerText.includes('Total') ||
                    rows[rows.length - 1].innerText.includes('TOTAL')
                )
                    rows[rows.length - 1].classList.add('totalRow');
            }
        });
        updatedContent = div.innerHTML;
    }

    if (isJsEnabled)
        pageContent = pageContent
            .replace(new RegExp('src="', 'g'), 'data-src="')
            .replace(new RegExp('srcset="', 'g'), 'data-srcset="');
    pageContent = parse(pageContent, {
        replace: domNode => {
            if (domNode.name === 'img') {
                const { attribs } = domNode;
                if (attribs.width && attribs.height) {
                    attribs.width = null;
                    attribs.height = null;
                }
                attribs.class = 'lazyload';
            }
            if (domNode.name === 'figure') {
                const { attribs } = domNode;
                if (attribs.style) {
                    attribs.style = null;
                }
            }
            if (domNode.name === 'span') {
                const { attribs } = domNode;
                Object.keys(attribs).forEach(e => (attribs[e] = null));
            }
            const { attribs } = domNode;
            if (attribs && attribs.class && String(attribs.class).includes('-')) {
                attribs.class = String(attribs.class).replace(new RegExp('-', 'g'), '');
                return attribs;
            }
        },
    });

    useEffect(() => {
        if (typeof document !== 'undefined') {
            //Multi column table class
            const allTables = document.querySelectorAll('.datatabletopheadfilled tbody');
            const allTr = document.querySelectorAll('.datatabletopheadfilled tr');
            [...allTr].forEach(item => {
                if (item.childElementCount > 2) {
                    item.closest('.datatabletopheadfilled').classList.add('multiColumn');
                }
            });
            [...allTables].forEach(item => {
                const trContent = item.querySelectorAll('.content');
                for (var i = 0; i < trContent.length; i++) {
                    if (i % 2) {
                        trContent[i].classList.add('even');
                    } else {
                        trContent[i].classList.add('odd');
                    }
                }
            });
            const element = document.getElementsByClassName('postMain')[0];
            const imageHeight = element ? element.offsetWidth / 1.6 + 35 : 0;
            const images = Array.prototype.slice.call(
                document.getElementsByClassName('wpblockimage'),
            );
            images &&
                images.forEach(entry => {
                    entry.style.minHeight = imageHeight + 'px';
                });
            const linkSection = document.querySelector('.postjumplink');
            if (linkSection !== null) {
                const links = Array.prototype.slice.call(linkSection.querySelectorAll('a'));
                links &&
                    links.forEach(entry => {
                        entry.addEventListener('click', function(e) {
                            e.preventDefault();
                            var elementPosition = document.querySelector(entry.getAttribute('href'))
                                .offsetTop;
                            const y = isMobile ? 150 : 75;
                            scrollTo(document.documentElement, elementPosition - y, 500);
                        });
                    });
            }
            //this is for button fix when enabling concurrent connections
            const areaGuidedButtons = Array.prototype.slice.call(
                document.querySelectorAll('.areaguidelistingbutton'),
            );
            areaGuidedButtons &&
                areaGuidedButtons.forEach(entry => {
                    if (!entry.textContent) entry.style.display = 'none';
                });
            //end of button fix
            const whatsappBtn = document.getElementById('whatsappBtn');
            const scrollCallBack = window.addEventListener('scroll', () => {
                if (window.pageYOffset > 110) {
                    whatsappBtn.classList.add('visible');
                } else {
                    whatsappBtn.classList.remove('visible');
                }
            });
            return () => {
                window.removeEventListener('scroll', scrollCallBack);
            };
        }
    }, [isMobile]);
    return (
        <div className="container">
            {featuredImage && (
                <img
                    id="photoMain"
                    src={isMobile && featuredImage ? featuredImage : mediaItemUrl}
                    className="photoMain"
                    // data-src={isMobile && featuredImage ? featuredImage : mediaItemUrl}
                    // data-srcset={srcSet}
                    alt={title}
                />
            )}
            <div className="flexBox">
                <div className="postMain">
                    <h1 className="title">{decodeHTML(title)}</h1>
                    <PostNav title={title} lang={lang} />
                    {pageContent}
                </div>
            </div>
            <a
                id="whatsappBtn"
                className="whatsappBtn"
                href={`https://api.whatsapp.com/send?text=${title} https://www.bayut.com${typeof window !==
                    'undefined' && window.location.pathname}`}
            >
                Share on whatsapp
            </a>
        </div>
    );
};
export default Post;
