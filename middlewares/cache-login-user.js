module.exports = function (req, res) {
    if (req.body.remember) {
        req.session.maxAge = 60 * 60000;
    } else {
        req.session.expires = false;
    }
    res.redirect('/');
};