// TEAGUE - Global Design Studio
// Updates contact wschramm@teague.com
// Original sample site from Christopher Buecheler: https://github.com/cwbuecheler/node-tutorial-for-frontend-devs
// Last updated 2015-12-23

// Warning and Credits
console.log("CODE Fault Simulator: TEAGUE - Global Design Studio");
console.log("Warning! This page	 will not run on the TEAGUE internal network");
console.log("Press 'control-c' to exit");


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoLab Database Connection
var mongo = require('mongodb');
var monk = require('monk');
// Example DB Connection string, replace with your own data
var db = monk('mongodb://DataIn:nnnnnnnnnnnnnnnnnn.mongolab.com:46818,nnnnnnnnn-a1.mongolab.com:46816/connectedobjdb?replicaSet=rs-ds0000000');

var routes = require('./routes/index');
var faults = require('./routes/faults');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('.html', require('jade').renderFile);


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/faults', faults);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
