var connection = require('../connection');

function homeController() {
    this.get = function (req, res) {                
        res.render('home/index', { title: 'Welcome to your homepage', user: req.user, message: req.flash('homeMessage')  });        
    };
}

module.exports = new homeController();