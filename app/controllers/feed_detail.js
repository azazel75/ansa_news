var args = arguments[0] || {};
var feed = args.feed;
var cback = args.callback;
var utils = require('utils');

function okResult() {
    var site_url = $.url.getValue();
    feed.set('site_url', site_url);
    feed.set('name', $.name.getValue());

    if (!site_url) {
        Ti.UI.createNotification({message: 'Devi inserire un indirizzo'}).show();
        return;
    }

    function onResFromYQL (result) {
        var data = result.data;
        if (result.success && data) {
            $.feed_detail.close();
            feed.set('url', data.link.href);
            if (cback)
                cback.call(undefined, 'ok', feed);
        } else {
            Ti.UI.createNotification({message: 'Nessun feed RSS trovato a questo indirizzo'}).show();
            $.url.focus();
        }
    }

    utils.getRSSLink(site_url, onResFromYQL);
}

function cancelResult() {
    $.feed_detail.close();
    if (cback)
        cback.call(undefined, 'cancel', feed);
}

$.name.setValue(feed.get('name'));
$.url.setValue(feed.get('site_url'));
