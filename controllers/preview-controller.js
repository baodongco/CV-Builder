function previewController() {
    this.get = function (req, res) {                
        res.render('preview/index', { title: 'WTF', req: req, message: req.flash('homeMessage')  });        
    };
}

module.exports = new previewController();