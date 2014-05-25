exports.definition = {
    config: {
        columns: {
            "link": "text",
            "title": "text",
            "date": "text",
            "description": "text"
        },
        adapter: {
            type: "sql",
            collection_name: "post",
            idAttribute: 'link'
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {

        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            fetchRSS: function(url) {
                var rss = require('rss'),
                    self = this,
                    data;
                function handleFeedData(feed) {
                    self.add(feed.blog_posts);
                }
                rss.getRSSData(url, handleFeedData);
            }
        });

        return Collection;
    }
};
