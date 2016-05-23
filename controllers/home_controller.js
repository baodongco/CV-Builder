var connection = require('../DAL/connection');

function homeController() {
    this.get = function (res) {
        res.render('home/index', { title: 'Welcome to your homepage' });
    }
}

module.exports = new homeController();