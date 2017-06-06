/**
 * Created by ska on 6/6/17.
 */
"use strict";
const
    debug = require('debug')('api:svc:airline'),
    rp = require('request-promise-native'),
    cfg = require('../config.js');

module.exports = {
  list: function(q){
      const options = {
          uri: cfg.airport.source.url,
          qs: {q: q},
          headers: {
              'User-Agent': 'Request-Promise'
          },
          json: true
      };

      return rp(options);
  }
};

