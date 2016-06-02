var connection    = require('../connection');
var sql       = require('../services/resume-services');

function previewController() {
    this.get = function (req, res) {                
        connection.pool.query(sql.getTemplates, function (err, temp_rows) {
            if(err) {
                throw err.stack
            } else {
                connection.pool.query("SELECT id FROM resume WHERE id = ?", req.params.id, function (err, res_rows) {
                    if (err) {
                    throw err.stack;
                    } else {
                        console.log('res_rows', res_rows);
                        if (!res_rows[0].id) {
                            res.status(404).send('File not found');
                        } else {
                            res.render('preview/index', { title: 'Preview', resumeId: res_rows[0].id, templates: temp_rows, req: req});
                        }
                    }
                });
                
            }
        });               
    };
}

module.exports = new previewController();