import loadable from '@loadable/component';
const PostContent = loadable(() => import('./postContent'));
const HomePage = loadable(() => import('./homePage'));
const PostNav = loadable(() => import('./postNav'));
const PostPreview = loadable(() => import('./postPreview'));

export { PostContent, HomePage, PostNav, PostPreview };
