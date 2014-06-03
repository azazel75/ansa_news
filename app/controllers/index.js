var feeds = Alloy.Collections.feed;
var utils = require('utils');
function showPosts(e) {
    var feed = feeds.at(e.itemIndex);
    var posts = Alloy.createController('posts', feed)
        .getView();
    posts.open();
}

function addFeed(e) {
    var feed = Alloy.createModel('feed');
    var feed_detail = Alloy.createController('feed_detail', {feed: feed, callback: afterAddClose})
        .getView();
    feed_detail.open();
}

function afterAddClose(result, feed) {
    if (result === 'ok') {
        feed.save();
        feeds.add(feed);
    }
}

feeds.fetch();
$.index.open();
