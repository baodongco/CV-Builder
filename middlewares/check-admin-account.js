module.exports = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role != 'user')
        return next();

    res.redirect('/login');
};