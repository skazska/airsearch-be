/**
 * Created by ska on 6/6/17.
 */
"use strict";

const
    debug = require('debug')('api:ctrl:airline'),
    svc = require('../svc/airport.js');

module.exports = {
    getList: async (req, res, next) => {
        //params validation:  search string q with at least 2 letters
        if ( !(typeof req.query.q === 'string' && req.query.q.length > 1))
            return res.xSet(400, 'request should contain query param "q" with search text', next);
        //query data service
        try {
            res.xSet(200, await svc.list(req.query.q), next);
        } catch (e) {
            next(e);
        }
    }
};

