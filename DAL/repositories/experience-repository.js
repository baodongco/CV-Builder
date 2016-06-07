var db = require('../connection');

module.exports = function () {
	this.create = function(data, callback) {
		db.pool.query('INSERT INTO experience SET ?', data, function (err) {
			if (err) console.log(err);
		});
	};
};