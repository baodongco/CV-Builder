var db = require('../connection');

module.exports = function () {
	this.create = function(data, callback) {
		db.pool.query('INSERT INTO education SET ?', data);
	};
};