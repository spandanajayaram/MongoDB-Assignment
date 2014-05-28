var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoskin = require('mongoskin');
var monk = require('monk');
var util = require('util');
var db = monk('lifebooknms49:27017/mydb');

var routes = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/items');
var ref = require('./routes/ref');
var cosmetic = require('./routes/cosmetic');
var book = require('./routes/book');
var searchItem = require('./routes/searchItem');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var mongo1 = require('mongoskin');
var db1 = mongo1.db("mongodb://localhost:27017/mydb", {native_parser:true});
db1.bind('item');
//db1.iteminfo.find().toArray(function(err, items) {
//	    console.log("ITEMINFO : " + util.inspect(items));
//        db1.close();
//});

app.use(function(req,res,next){
	req.db = db1;
	next();
});
app.use('/', routes);
app.use('/users', users);
app.use('/items', items);
app.use('/ref', ref);
app.use('/cosmetic', cosmetic);
app.use('/book', book);
app.use('/searchItem', searchItem);








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
