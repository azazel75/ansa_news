migration.up = function(db) {
    db.db.execute('ALTER TABLE ' + db.table + ' ADD COLUMN idfeed INT;');
    db.db.execute('UPDATE ' + db.table + ' SET idfeed = 1;');
};

migration.down = function(db) {

};
