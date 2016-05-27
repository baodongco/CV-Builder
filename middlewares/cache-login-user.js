module.exports = function (req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 60 * 60000;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect('/');
};