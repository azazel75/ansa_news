var posts = Alloy.Collections.post;

function preparePostData(pmodel) {
    var post = pmodel.toJSON();
    post.searchableText = post.title + ' ' + post.description;
    console.log(post);
    return post;
}

posts.fetchRSS();
$.index.open();
