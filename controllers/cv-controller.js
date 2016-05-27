function cvController() {
    this.getView = function (req, res) {
        if (req.user)
            res.redirect('/login');
        else {     
            var user = { name: "Tran Dung Sy", email: "sybikhung"};
            res.render('cv-template/skeleton', {user: user});
        };                               
    };
    this.getDownload = function (req, res) {
        var ejs = require('ejs');
        var user = { firstName: "Tran", lastName: "Dung Sy", email: "sybikhung"};
        var file ="";
        if (req.params.id > 0) {
            file = "skeleton.ejs";
        } else {
            file = "demo.ejs";
        }
        ejs.renderFile('./views/cv-template/'+ file, {user: user}, null, function (err,html) {
            if (err) {
                console.log(err.stack);
                throw err;
            } else {
                var pdf = require('html-pdf');
                var options = require('../config/cv-pdf.js');
                options.base = "http://" +req.headers.host;
                pdf.create(html,options).toStream(function(err, stream){
                res.setHeader("content-type", "application/pdf");
                stream.pipe(res);
            });
          }
      });
    };
};

module.exports = new cvController();