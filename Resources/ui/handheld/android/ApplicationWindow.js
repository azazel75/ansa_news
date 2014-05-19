var rss = require('rss');
var PostsList = require('ui/common/PostsList');
var BrowserWindow = require('ui/common/BrowserWindow');
var AppMenu = require('ui/handheld/android/ApplicationMenu');

function ApplicationWindow(posts) {

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

    function refreshClick() {
        rss.getRSSData(null, function(data) {
            posts_view.updateList(data.blog_posts);
        });
    };

    var menu = AppMenu.createApplicationMenu(self, refreshClick);

    posts_view.setSearchView(menu.search);
    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
