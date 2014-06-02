var initial_data = [
    {id: 1, name: "ANSA Cronaca",
     site_url: "http://www.ansa.it/sito/notizie/cronaca/cronaca.shtml",
     url: "http://ansa.feedsportal.com/c/34225/f/621689/index.rss"}
];
migration.up = function(db) {
    var i, len;
    db.createTable({
        columns: {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "name": "text",
            "site_url": "text",
            "url": "text"
        }
    });

    for (i = 0, len = initial_data.length; i < len; i++) {
        db.insertRow(initial_data[i]);
    }
};

migration.down = function(db) {

};
