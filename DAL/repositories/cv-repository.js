var db = require('../connection');

module.exports = function () {
	this.create = function(data, callback) {
		db.pool.query('INSERT INTO resume SET', data, function(err, rows) {
			callback(rows);
		});
	};

	this.update = function(data, callback) {
		db.pool.query('UPDATE resume SET', data, function(err, rows) {
			callback(rows);
		});
	};
};