function templateController() {
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
        var user = { name: "Tran Dung Sy", email: "sybikhung"};
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
                var options = {
                  // Export options
                  "directory": "/public/public-cv",       // The directory the file gets written into if not using .toFile(filename, callback). 

                  // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
                  
                  "orientation": "portrait", // portrait or landscape

                  // Page options
                  "border": "1cm",             // default is 0, units: mm, cm, in, px
                   "width": "1240px",
                   "height": "1758px",

                  "header": {
                    "height": "15mm",
                    "contents": '<div style="text-align: center;">Team <b>GAIS</b> - Nodejs 2</div>'
                },
                "footer": {
                    "height": "20mm"                  
                },


                  // Rendering options
                  // Base path that's used to load files (images, css, js) when they aren't referenced using a host
                  "base": "http://"+req.headers.host,
                  // File options
                  "type": "pdf",             // allowed file types: png, jpeg, pdf
                  //"quality": "75",           only used for types png & jpeg

                  // Script options
                   // PhantomJS binary which should get downloaded automatically
                  "timeout": 30000,           // Timeout that will cancel phantomjs, in milliseconds

                  //"httpHeaders": {
                  //  "Authorization": "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
                  //}

              };
              pdf.create(html,options).toStream(function(err, stream){
                res.setHeader("content-type", "application/pdf");
                stream.pipe(res);
            });
          }
      });
    };
};

module.exports = new templateController();