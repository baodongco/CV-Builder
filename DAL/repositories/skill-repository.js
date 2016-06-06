var db = require('../connection');

module.exports = function () {
	this.create = function(data, callback) {
		db.pool.query('INSERT INTO skill SET ?', data);
	};

	this.update = function(data, callback) {
		db.pool.query('UPDATE skill SET ?', data);
	};
};