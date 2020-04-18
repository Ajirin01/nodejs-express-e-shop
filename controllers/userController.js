exports.login = function(req, res, next) {
    res.render('login', { title: 'login' });
}
exports.signup = function(req, res, next) {
    res.render('signup', { title: 'signup' });
}