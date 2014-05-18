function ApplicationWindow(posts) {
    //load component dependencies
    var PostsList = require('ui/common/PostsList');
    var BrowserWindow = require('ui/common/BrowserWindow');
    var AppMenu = require('ui/handheld/android/ApplicationMenu');

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
    AppMenu.createApplicationMenu(self);
    var posts_view = new PostsList(posts.blog_posts, itemClick);
    posts_view.setSearchView(AppMenu.search);
    self.add(posts_view);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
