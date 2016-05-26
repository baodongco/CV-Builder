var connection = require('../connection');

function homeController() {
    this.get = function (req, res) {
        if (req.user == undefined) {
            // User not login
            res.render('home/index', { title: 'Welcome to your homepage', username: 'null', message: req.flash('registerConfirm') });
        } else {
            // User already login
            res.render('home/index', { title: 'Welcome to your homepage', username: req.user.username, message: req.flash('registerConfirm')  });
        }
    };
}

module.exports = new homeController();