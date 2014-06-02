var feeds = Alloy.Collections.feed;
function showPosts(e) {
    var feed = feeds.at(e.itemIndex);
    var posts = Alloy.createController('posts', feed)
        .getView();
    posts.open();
}
feeds.fetch();
$.index.open();
