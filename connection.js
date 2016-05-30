var mysql = require('mysql');
var config = require('config');
var dbSettings = config.get('cv-builder.db');

function Connection() {
    this.pool = null;
    
    this.init = function () {
        this.pool = mysql.createConnection({
            connectionLimit: dbSettings['connectionPool'],
            host: dbSettings['host'],
            user: dbSettings['user'],
            password: dbSettings['pass'],
            database: dbSettings['dbName'],
            multipleStatements: true
        });
    }
}

module.exports = new Connection();