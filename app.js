var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var engine       = require('ejs-mate');
var passport     = require('passport');
var flash        = require('connect-flash');
var session      = require('express-session');
var url          = require('url');
var elogger = require('express-logger');

var home = require('./routes/home');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var resume = require('./routes/resume');
var preview = require('./routes/preview');
var connection = require('./connection');

var app = express();

//Initialize mysql connection.
connection.init();
connection.pool.connect();

// Setup view engine
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setup authentication with passport
require('./utilities/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'cvbuilderauth', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Write dev log and log files.
app.use(logger('dev'));
app.use(elogger({path: __dirname + "/logfile.txt"}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// Setup routing.
home.configure(app);
auth.configure(app, passport);
admin.configure(app);
resume.configure(app);
preview.configure(app);

// catch 404 and forward to error handler
app.get('/404', function (req, res) {
   res.render('404');
});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    // res.redirect('/404.html');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
