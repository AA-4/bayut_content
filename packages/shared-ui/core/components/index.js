import loadable from '@loadable/component';
import Spinner from './spinner';
import SEO from './seo';
import Layout from './layout';
import Header from './header';
import HomePost from './homePost'; // Do not make loadable, hurts performance
const Footer = loadable(() => import('./footer'));
const CategoryPost = loadable(() => import('./categoryPost'));
const SearchResults = loadable(() => import('./searchResults'));
const SearchPagination = loadable(() => import('./searchPagination'));
const SubCategoryNav = loadable(() => import('./subCategoryNav'));
const CategoryPagination = loadable(() => import('./categoryPagination'));

export {
    Layout,
    Header,
    Footer,
    SEO,
    CategoryPost,
    HomePost,
    Spinner,
    SearchResults,
    CategoryPagination,
    SearchPagination,
    SubCategoryNav,
};
