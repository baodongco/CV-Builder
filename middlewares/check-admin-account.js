module.exports = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin')
        return next();

    req.flash('homeMessage', 'You do not have priviledge to access.');
    res.redirect('/');
};