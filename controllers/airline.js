/**
 * Created by ska on 6/6/17.
 */
"use strict";

const
    debug = require('debug')('api:ctrl:airline'),
    svc = require('../svc/airline.js');

module.exports = {
    getList: async (req, res, next) => {
        try {
            res.xSet(200, await svc.list(), next);
        } catch (e) {
            next(e);
        }
    }
};

