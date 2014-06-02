migration.up = function(db) {
    db.dropTable();
    db.createTable({
        columns: {
            "id": "TEXT PRIMARY KEY",
            "link": "text",
            "title": "text",
            "date": "text",
            "description": "text"
        }
    });
};

migration.down = function(db) {

};
