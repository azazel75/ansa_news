exports.definition = {
    config: {
        columns: {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "name": "text",
            "site_url": "text",
            "url": "text"
        },
        adapter: {
            type: "sql",
            collection_name: "feeds",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here
        });

        return Collection;
    }
};
