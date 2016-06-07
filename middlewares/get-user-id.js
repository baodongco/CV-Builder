module.exports = function (req, res, next) {
    req.body.userId = req.user.id;
    return next();
}