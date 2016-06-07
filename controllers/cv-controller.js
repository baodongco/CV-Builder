function cvController() {
    var demoUser = {
        firstName: "Tran",
        lastName: "Dung Sy",
        email: "sybikhung@gmail.com",
        phone: "0123456789",
        website: "google.com",
        address: "Abc, Vietnam",
        sumHeadline: "<h5><em>Sum of</em></h5> sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline sumHeadline ",
        sumContent: "<h4><em>Sum of</em></h4> sumContent sumContent sumContent sumContent sumContent sumContent sumContent sumContent sumContent",
        photoUrl: "/public/images/sysysy.png",
        publiclink: "https://facebook.com/BillGates",
        skills: [{
            name: "C#", expertise: "5",
            experience: "3 years", lastUsed: "Hom qua"
        }, {
            name: "PHP", expertise: "3",
            experience: "1 year", lastUsed: "Tuan truoc"
        }],
        projects: [{
            title: "Tam su cung nguoi la",
            url: "google.com",
            startTime: "3/5/1999",
            endTime: "5/3/2000",
            detail: "Detail Detail Detail Detail Detail Detail Detail Detail"
        }, {
            title: "Tam su cung nguoi quen",
            url: "google.com",
            startTime: "3/5/2009",
            endTime: "5/3/2011",
            detail: "Detail Detail Detail Detail Detail Detail Detail Detail"
        }]
    };

    this.getView = function (req, res) {
        if (req.user)
            res.redirect('/login');
        else {
            res.render('cv-template/skeleton', {user: demoUser});
        }
        ;
    };
    this.getDownload = function (req, res) {
        var ejs = require('ejs');
        var file = "";
        if (req.params.id > 0) {
            file = "skeleton.ejs";
        } else {
            file = "demo.ejs";
        }
        ejs.renderFile('./views/cv-template/' + file, {user: demoUser}, null, function (err, html) {
            if (err) {
                console.log(err.stack);
                throw err;
            } else {
                var pdf = require('html-pdf');
                var options = require('../config/cv-pdf.js');
                options.base = "http://" + req.headers.host;
                pdf.create(html, options).toStream(function (err, stream) {
                    res.setHeader("content-type", "application/pdf");
                    stream.pipe(res);
                });
            }
        });
    };
};

module.exports = new cvController();