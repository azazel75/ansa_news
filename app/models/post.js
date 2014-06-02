var moment = require('alloy/moment');
exports.definition = {
    config: {
        columns: {
            "id": "TEXT PRIMARY KEY",
            "link": "text",
            "title": "text",
            "date": "text",
            "description": "text",
            "idfeed": "integer"
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
            fetchRSS: function(feed) {
                var rss = require('rss'),
                    self = this,
                    data;
                function handleFeedData(data) {
                    _.map(data.blog_posts,
                          function(post) {
                              post.id = Ti.Utils.md5HexDigest(post.link);
                              post.idfeed = feed.get('id');
                              if (!self.get(post.id)) {
                                  self.create(post);
                              }
                          });
                }
                rss.getRSSData(feed.get('url'), handleFeedData);
            },
            comparator: function(model) {
                return 0 - moment(model.get('date')).unix();
            }
        });

        return Collection;
    }
};
