import 'lazysizes';

if (window.location.pathname.includes('/page/') && window.location.search.startsWith('?s=')) {
    // set page number in localstorage for search result load with browser refresh button
    let pathNameArray = window.location.pathname.split('/page/');
    localStorage.setItem('searchPage', pathNameArray[1].replace('/', ''));
    window.location = `${pathNameArray[0]}/${window.location.search}`;
}
