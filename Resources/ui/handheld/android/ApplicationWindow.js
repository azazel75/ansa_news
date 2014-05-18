function ApplicationWindow(posts) {
    //load component dependencies
    var PostsList = require('ui/common/PostsList');

    //create component instance
    var self = Ti.UI.createWindow({
        backgroundColor:'#ffffff',
        navBarHidden:true,
        exitOnClose:true
    });

    //construct UI
    var posts_view = new PostsList(posts.blog_posts);
    self.add(posts_view);

    return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
