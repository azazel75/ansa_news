function ApplicationWindow(posts) {
    //load component dependencies
    var PostsList = require('ui/common/PostsList');

    //create component instance
    var self = Ti.UI.createWindow({
        backgroundColor:'#ffffff',
        exitOnClose:true
    });

    function itemClick(e) {
        var ditem = e.section.getItemAt(e.itemIndex);
        var wv = Ti.UI.createWebView({url: ditem.link});
        self.add(wv);

    }
    //construct UI
    var posts_view = new PostsList(posts.blog_posts, itemClick);
    self.add(posts_view);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
