var db = require('../connection');

module.exports = function () {
    this.create = function (data, callback) {
        db.pool.query('INSERT INTO certification SET ?', data);
    };

    this.update = function (data, callback) {
        db.pool.query('UPDATE certification SET ?', data);
    };
};