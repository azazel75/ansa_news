var moment = require('alloy/moment');
var posts = Alloy.Collections.post;

function preparePostData(pmodel) {
    var post = pmodel.toJSON();
    post.searchableText = post.title + ' ' + post.description;
    post.date = moment(post.date).fromNow();
    return post;
}

function showPost(e) {
    var src = $.searchPosts.getValue() || '';
    var filtered;
    // fix for https://jira.appcelerator.org/browse/TIMOB-16079
    if (src && src.length > 0) {
        filtered = posts.filter(function(post) {
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
    posts.fetchRSS();
}
posts.fetch();
$.index.open();
