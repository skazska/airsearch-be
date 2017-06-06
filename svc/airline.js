/**
 * Created by ska on 6/6/17.
 */
"use strict";
const
    debug = require('debug')('api:svc:airline'),
    rp = require('request-promise-native'),
    cfg = require('../config.js');

module.exports = {
  list: function(){
      const options = {
          uri: cfg.airline.source.url,
          qs: {},
          headers: {
              'User-Agent': 'Request-Promise'
          },
          json: true
      };

      return rp(options);
  }
};

