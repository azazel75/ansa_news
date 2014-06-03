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
    openFeedDialog(feed, afterAddClose);
}

function afterAddClose(result, feed) {
    if (result === 'ok') {
        feed.save();
        feeds.add(feed);
    }
}

function editFeed(e) {
    var feed = feeds.at(e.itemIndex);
    function resHandler(result, feed) {
        if (result === 'ok')
            feed.save();
    }
    openFeedDialog(feed, resHandler);
}

function openFeedDialog(feed, callback) {
    var feed_detail = Alloy.createController('feed_detail', {feed: feed, callback: callback})
        .getView();
    feed_detail.open();
}

feeds.fetch();
$.index.open();
