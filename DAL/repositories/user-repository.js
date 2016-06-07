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
            function (err, users) {
                callback(users);
            });
    };

    this.getCVsByUserId = function (id, callback) {
        connection.pool.query('SELECT * FROM resume WHERE userId = ?', id,
            function (err, resumes) {
                callback(resumes);
            });
    };

    this.activate = function (activationCode, ttl, callback) {
        connection.pool.query("CALL SP_ACTIVATE_ACCOUNT('" + activationCode + "'," + ttl + ")", function (err, rows) {
            callback(err, rows);
        });
    };

    this.validateReset = function (email_address, callback) {
        connection.pool.query("CALL SP_RESET_PASSWORD('" + email_address + "')", function (err, rows) {
            callback(err, rows);
        });
    };

    this.resetComplete = function (guid, ttl, callback) {
        connection.pool.query("CALL SP_RESET_PASSWORD_COMPLETE('" + guid + "'," + ttl + ")", function (err, rows) {
            callback(err, rows);
        });
    };

    this.resetPassComplete = function (newHasingPass, guid, callback) {
        connection.pool.query("UPDATE user SET password = ?, resetPassCode = NULL WHERE resetPassCode = ?", [newHasingPass, guid], function (err, rows) {
            callback(err, rows);
        });
    };

    this.changePassword = function (id, callback) {
        connection.pool.query("SELECT * FROM user WHERE id = ? ", id, function (err, rows) {
            callback(err, rows);
        });
    };
};