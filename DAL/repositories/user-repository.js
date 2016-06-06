var connection = require('../connection');

module.exports = function () {
    this.getAll = function (callback) {
        connection.pool.query('SELECT * FROM user', function (err, users) {
            callback(users);
        });
    };
    
    this.checkExisting = function (columnName, value, callback) {
        connection.pool.query('SELECT id FROM user WHERE ' + columnName + ' = ?', value, function (err, users) {
            callback(users);
        });
    };

    this.update = function (columnName, value, id, callback) {
        connection.pool.query('UPDATE user SET ' + columnName + ' = ? WHERE id = ?', [value, id], function () {
            callback();
        });
    };
    
    this.create = function (user, callback) {
        connection.pool.query('INSERT INTO user SET ?', user, function () {
            callback();
        });
    };
    
    this.getWithCondition = function (column, value, callback) {
        connection.pool.query('SELECT * FROM user WHERE ' + column + ' = ?', value, 
            function (err, users) { callback(users); });
    };

    this.getCVsByUserId = function (id, callback) {
        connection.pool.query('SELECT * FROM resume WHERE userId = ?', id,
            function (err, resumes) { callback(resumes); });
    }
};