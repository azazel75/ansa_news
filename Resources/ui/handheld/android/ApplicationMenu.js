// -*- coding: utf-8 -*-
// :Progetto:  ANSA Demo -- window menu
// :Creato:    dom 18 mag 2014 23:55:51 CEST
// :Autore:    Alberto Berti <alberto@metapensiero.it>
// :Licenza:   GNU General Public License version 3 or later
//

var utils = require('utils');

function createApplicationMenu(win, refresh_handler) {
    var search = Ti.UI.Android.createSearchView({
        hintText: "Cerca",
        iconified: true
    }),
        result = {};

    result.search = search;

    win.activity.onCreateOptionsMenu = function(e) {
        var menu = e.menu;
        var menuItem = menu.add({
            title: 'Ricerca',
            actionView : search,
            icon: Ti.Android.R.drawable.ic_menu_search,
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
        });
        menuItem = menu.add({
            title: 'Ricarica',
            icon: 'images/refresh.png',
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
        });
        if (refresh_handler)
            menuItem.addEventListener('click', refresh_handler);
    };
    return result;
}

exports.createApplicationMenu = createApplicationMenu;
