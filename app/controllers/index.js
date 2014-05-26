var posts = Alloy.Collections.post;

function preparePostData(pmodel) {
    var post = pmodel.toJSON();
    post.searchableText = post.title + ' ' + post.description;
    return post;
}

function showPost(e) {
    var post = posts.at(e.itemIndex);
    var article = Alloy.createController('article', post)
                       .getView();
    article.open();
}
posts.fetchRSS();
$.index.open();
