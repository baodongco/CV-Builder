var db = require('../connection');

module.exports = function () {
	this.create = function(data, callback) {
		console.log('start insert resume');
		db.pool.query('INSERT INTO resume SET ?', data, function(err, rows) {
			if(err){
				console.log(err);
			}
			callback(rows);
		});
	};
};