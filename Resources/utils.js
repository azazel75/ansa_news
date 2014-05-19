// -*- coding: utf-8 -*-
// :Progetto:  ANSA Demo app -- utils
// :Creato:    dom 18 mag 2014 22:55:46 CEST
// :Autore:    Alberto Berti <alberto@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

function stripTags (str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski

    // fixed Titanium warning by: Kosso

    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'

    var key = '', allowed = false;
    var matches = [];
    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = '';

    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };

    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }

    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);

    // Go through all HTML tags
    for (key in matches) {

        if(key){

            // Save HTML tag
            html = matches[key].toString();

            // Is tag not in allowed list? Remove from str!
            allowed = false;

            // Go through all allowed tags
            for (k in allowed_array) {

                if(k){

                    // Init
                    allowed_tag = allowed_array[k];
                    i = -1;

                    if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
                    if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
                    if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}

                    // Determine
                    if (i == 0) {
                        allowed = true;
                        break;
                    }

                }
            }

            if (!allowed) {
                str = replacer(html, "", str); // Custom replace. No regexing
            }

        }
    }

    return str;
}

function log() {
    var a = Array.prototype.slice.call(arguments, 0);
    a.unshift('ANSA>>>: ');
    console.log(a);
}

function shareURI(link, title) {
    var intent = Ti.Android.createIntent(
        {action: Ti.Android.ACTION_SEND,
         type: 'text/plain'});
    intent.putExtra(Ti.Android.EXTRA_SUBJECT, title);
    intent.putExtra(Ti.Android.EXTRA_TEXT, link);
    intent = Ti.Android.createIntentChooser(intent, 'Condividi con...');
    Ti.Android.currentActivity.startActivity(intent);
}

exports.stripTags = stripTags;
exports.log = log;
exports.shareURI = shareURI;
