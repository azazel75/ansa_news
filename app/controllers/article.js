var args = arguments[0] || {};
var post = args.toJSON();
var utils = require('utils');

function close() {
    $.article.close();
}

function share() {
    utils.shareURI(post.link, post.title);
}
function setupMenu (e) {
    if (OS_ANDROID) {
        $.article.activity.actionBar.setSubtitle(post.title);
        $.article.activity.actionBar.setDisplayHomeAsUp(true);
        $.article.activity.actionBar.onHomeIconItemSelected = close;
    }
}
$.browser.setUrl(post.link);
