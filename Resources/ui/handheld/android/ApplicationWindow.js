function ApplicationWindow(posts) {
    //load component dependencies
    var PostsList = require('ui/common/PostsList');
    var BrowserWindow = require('ui/common/BrowserWindow');

    //create component instance
    var self = Ti.UI.createWindow({
        backgroundColor:'#ffffff',
        exitOnClose:true
    });

    function itemClick(e) {
        var ditem = e.section.getItemAt(e.itemIndex);
        BrowserWindow(ditem.link, ditem.title.text).open();
    }
    //construct UI
    var posts_view = new PostsList(posts.blog_posts, itemClick);
    self.add(posts_view);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
