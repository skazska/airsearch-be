/**
 * Created by ska on 6/6/17.
 */

'use strict';

const _ = require('lodash');
const debug = require('debug')('web:config');

//default config
module.exports = {
    server: {
        port: process.env.PORT || '3000',
        ssl: false,
        options: {
            key: '~/.ssh/serv-key.pem',
            cert: '~/.ssh/serv-cert.pem'
        }

    },
    airline: {
        source: {
            url: "http://node.locomote.com/code-task/airlines"
        }
    },
    airport: {
        source: {
            url: "http://node.locomote.com/code-task/airports"
        }
    },
    flightSearch: {
        source: {
            url: "http://node.locomote.com/code-task/flight_search"
        }
    }
};

if (process.env.NODE_ENV) {
    debug('Run with ' + process.env.NODE_ENV + ' environment config');
} else {
    debug('environment not specified, do run with development config');
}

//merge env config
module.exports = _.extend(
    module.exports,
    require('./config/' + (process.env.NODE_ENV || 'dev')) || {}
);
