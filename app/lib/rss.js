// -*- coding: utf-8 -*-
// :Progetto:  Demo RSS view --
// :Creato:    lun 12 mag 2014 15:07:54 CEST
// :Autore:    Alberto Berti <alberto@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

utils = require('/utils');

function getPosts(url, callback) {
    url = url || "http://ansa.feedsportal.com/c/34225/f/621689/index.rss";
    var client = Ti.Network.createHTTPClient({
        onload : function(e) {
            var xml = this.responseXML,
                channel = xml.documentElement.getElementsByTagName("channel"),
                data = [],
                items = xml.documentElement.getElementsByTagName("item"),
                rss, i, date;
            for (i=0;i<items.length;i++) {
                date = null;
                date = items.item(i).getElementsByTagName("pubDate").item(0)
                if (!date)
                    // try with dublinCore
                    date =  items.item(i).getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'date').item(0) || {};
                data.push({
                    title: items.item(i).getElementsByTagName("title").item(0).textContent,
                    link: items.item(i).getElementsByTagName("link").item(0).textContent,
                    date: date.textContent,
                    description: utils.stripTags(items.item(i).getElementsByTagName("description").item(0).textContent)

                });
            }
            rss = {
                blog_title: channel.item(0).getElementsByTagName("title").item(0).textContent,
                blog_posts: data
            };
            Ti.App.fireEvent('net:rssdata', rss);
            if (callback)
                callback(rss);
        },
        onerror : function(e) {
            console.debug(e.error);
            alert('error');
        },
        timeout : 5000
    });

    client.open("GET", url);
    client.send();
}

exports.getRSSData = getPosts;
