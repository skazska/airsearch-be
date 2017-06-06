/**
 * Created by ska on 6/6/17.
 */

'use strict';

const
    express = require('express'),
    logger = require('morgan'),
    debug = require('debug')('expressApp'),
    //cookieParser = require('cookie-parser'),
    //bodyParser = require('body-parser'),
    cfg = require('./config.js');

const app = express();

app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());


//add response shortcuts
app.use(function (req, res, next) {
//to set status and response
    res.xSet = function (status, data, next, contentType) {
        this.xStatusCode = status;
        this.xContentType = contentType || 'application/json';
        this.xData = data;
        if (next && ( typeof next == 'function' )) next();
    };
    next();
});


const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

//send json response, actually
app.use(function (req, res, next) {
    if (res.xData || res.xStatusCode) {
        if (res.xContentType) {
            res.setHeader('Content-Type', res.xContentType);
            res.status(res.xStatusCode);
            if (res.xContentType == 'application/json') {
                res.end(JSON.stringify(res.xData, null, 2));
            } else {
                res.end(res.xData);
            }
        } else {
            if (res.xData) debug(res.xStatusCode + ' response with no contentType! ');
            next();
        }
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function (err, req, res, next) {
        if (!res.xStatusCode || (res.xStatusCode && res.xStatusCode < 400)) res.statusCode = err.status || 500;
        res.setHeader('Content-Type', res.xContentType || 'text');
        res.end(err.stack);
        next(err);
    });
} else {
// production error handler
// no stacktraces
    app.use(function (err, req, res, next) {
        if (!res.xStatusCode || (res.xStatusCode && res.xStatusCode < 400)) res.statusCode = err.status || 500;
        res.setHeader('Content-Type', res.xContentType || 'text');
        res.end(err.message);
        next(err);
    });

}


module.exports = app;
