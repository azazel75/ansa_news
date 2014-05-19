var _ = require('/underscore');

var templates = {
    post: {
        properties: {
            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DETAIL,
            layout: 'vertical'

        },
        childTemplates: [
            {
                type: 'Ti.UI.Label',
                bindId: 'title',
                properties: {
                    left: '10dp',
                    right: 10,
                    color: 'blue'
                }
            },
            {
                type: 'Ti.UI.Label',
                bindId: 'description',
                properties: {
                    left: 10,
                    right: 30,
                    color: 'black',
                    font: {
                        fontSize: 10
                    }
                }
            },
            {
                type: 'Ti.UI.Label',
                bindId: 'date',
                properties: {
                    right: 10,
                    font: {
                        fontSize: 8
                    }
                }
            }

        ]
    }
};

function prepareData(data) {
    var list_data = _.map(data, function(post) {
        return {
            title: {text: post.title},
            date: {text: post.date},
            description: {text: post.description},
            link: post.link,
            properties: {
                searchableText: post.title + ' ' + post.description
            }
        };
    });
    return list_data;
}

function updateList(new_data) {
    console.log(new_data);
    this.sections[0].setItems(prepareData(new_data));
}

function PostsList(data, click_cback) {
    var sec = Ti.UI.createListSection({items: prepareData(data)});
    var list = Ti.UI.createListView({
        sections:[sec],
        templates: templates,
        defaultItemTemplate: 'post'
    });
    if (click_cback)
        list.addEventListener('itemclick', click_cback);
    list.updateList = updateList;
    return list;
}

module.exports = PostsList;
