var mysql = require('mysql');

function Connection() {
    this.pool = null;
    
    this.init = function () {
        this.pool = mysql.createConnection({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: '3120',
            database: 'CVBuilder'
        });
    }
}

module.exports = new Connection();