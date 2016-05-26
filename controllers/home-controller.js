function homeController() {
    this.get = function (req, res) {                
        res.render('home/index', { title: 'Welcome to your homepage', req: req, message: req.flash('homeMessage')  });        
    };
}

module.exports = new homeController();