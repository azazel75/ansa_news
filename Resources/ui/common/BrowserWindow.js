// -*- coding: utf-8 -*-
// :Progetto:  ANSA Demo -- mostra la pagina web
// :Creato:    dom 18 mag 2014 23:09:01 CEST
// :Autore:    Alberto Berti <alberto@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

var utils = require('utils');

function BrowserWindow(link, title) {
    var self = Ti.UI.createWindow({});
    var wv = Ti.UI.createWebView();
    self.add(wv);
    function onOpen(e){
        wv.setUrl(link);
        utils.log(title);
        self.activity.actionBar.setDisplayHomeAsUp(true);
        self.activity.actionBar.setSubtitle(title);
        self.activity.actionBar.setOnHomeIconItemSelected(function() {
            self.close();
        });
        self.activity.onCreateOptionsMenu = function(e) {
            var menu = e.menu;
            var menuItem = menu.add({
                title: 'Condividi',
                icon: Ti.Android.R.drawable.ic_menu_share,
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
            });
            menuItem.addEventListener('click',
                                      function(){
                                          utils.shareURI(link, title);
                                      });
        };
    }

    self.addEventListener('open', onOpen);
    return self;
}

module.exports = BrowserWindow;
