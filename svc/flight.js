/**
 * Created by ska on 6/6/17.
 */
"use strict";
const
    debug = require('debug')('api:svc:airline'),
    rp = require('request-promise-native'),
    cfg = require('../config.js');



module.exports = {
  list: function(airlineCode, dt, from, to){
      const options = {
          uri: cfg.flightSearch.source.url+'/'+airlineCode,
          qs: {date: dt, from: from, to: to},
          headers: {
              'User-Agent': 'Request-Promise'
          },
          json: true
      };

      return rp(options)
          .then(resp => {
              return resp || [];
          })
          .catch(reason => {
              if (reason.statusCode === 404) return [];
              console.log(reason);
              return [];
          });
  }
};

