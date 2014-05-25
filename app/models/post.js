exports.definition = {
	config: {
		columns: {
		    "link": "text",
		    "title": "text",
		    "description": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "post"
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