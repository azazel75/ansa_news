exports.definition = {
    config: {
        columns: {
            "id": "TEXT PRIMARY KEY",
            "link": "text",
            "title": "text",
            "date": "text",
            "description": "text"
        },
        adapter: {
            type: "sql",
            collection_name: "posts",
            idAttribute: 'id'
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
