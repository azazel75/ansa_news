var args = arguments[0] || {};
var feed = args.toJSON();
var moment = require('alloy/moment');
var posts = Alloy.Collections.post;
var feed_posts = Alloy.createCollection('post');

function preparePostData(pmodel) {
    var post;
    post = pmodel.toJSON();
    post.searchableText = post.title + ' ' + post.description;
    post.date = moment(post.date).fromNow();
    return post;
}

function showPost(e) {
    var src = $.searchPosts.getValue() || '';
    var filtered;
    // fix for https://jira.appcelerator.org/browse/TIMOB-16079
    if (src && src.length > 0) {
        filtered = feed_posts.filter(function(post) {
            var p = post.toJSON();
            var txt = p.title + ' ' + p.description;
            return txt.indexOf(src) > -1;
        });
        post = filtered[e.itemIndex];
    } else {
        post = posts.at(e.itemIndex);
    }
    var article = Alloy.createController('article', post)
                       .getView();
    article.open();
}

function fetchPosts(e) {
    posts.fetchRSS(args);
}

function filterPosts(ps) {
    feed_posts.reset(ps.where({idfeed: feed.id}));
    return feed_posts.models; // alloy si aspetta un array
}

function setupMenu (e) {
    if (OS_ANDROID) {
        $.posts.activity.actionBar.setSubtitle(feed.name);
        $.posts.activity.actionBar.setDisplayHomeAsUp(true);
        $.posts.activity.actionBar.onHomeIconItemSelected = close;
    }
}

function close() {
    $.posts.close();
}

posts.fetch();
