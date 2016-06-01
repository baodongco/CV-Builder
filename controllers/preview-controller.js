var connection    = require('../connection');
var sql       = require('../services/resume-services');

function previewController() {
    this.get = function (req, res) {                
        connection.pool.query(sql.getTemplates, function (err, rows) {
            if(err) {
                throw err.stack
            } else {
                console.log(rows);
                res.render('preview/index', { title: 'WTF', templates: rows, req: req});
            }
        })
               
    };
}

module.exports = new previewController();