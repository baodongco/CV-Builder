function adminController() {
    this.getIndex = function (req, res) {
        if (req.user.role == 'admin')
            res.render('admin/index', {title: 'Admin page'});
        else
            req.flash('homeMessage', 'You do not have priviledge to access.')
            res.redirect('/');
    };
}

module.exports = new adminController();