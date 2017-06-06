/**
 * Created by ska on 6/6/17.
 */
"use strict";

const
    debug = require('debug')('api:ctrl:airline'),
    moment = require('moment'),
    airline = require('../svc/airline.js'),
    flight = require('../svc/flight.js'),
    combine = require('../combine-hlp');

require('twix');

module.exports = {
    getList: async (req, res, next) => {
        //params validation:  search string q with at least 2 letters
        let dateFrom = moment(req.query.dateFrom);
        if (!dateFrom.isValid())
            return res.xSet(400, 'request should contain query param "dateFrom" in ISO 8601 format', next);

        let dateTo = moment(req.query.dateTo);
        if (!dateTo.isValid())
            return res.xSet(400, 'request should contain query param "dateTo" in ISO 8601 format', next);

        if ( !(typeof req.query.from === 'string' && req.query.from.length > 1))
            return res.xSet(400, 'request should contain query param "from" with departure airport code', next);

        if ( !(typeof req.query.to === 'string' && req.query.to.length > 1))
            return res.xSet(400, 'request should contain query param "to" with arrival airport code', next);

        //prepare query params and query data service
        try {
            let dates = dateFrom.twix(dateTo, {allDay: true}).toArray('days');
            dates = dates.map(dt => { return dt.format('YYYY-MM-DD'); });
            let airlines = await airline.list();
            airlines = airlines.map(airline => { return airline.code });
            //search with all params combinations
            let result = await Promise
                .all(combine.combineApply(flight.list, this, airlines, dates, req.query.from, req.query.to));
            result = [].concat.apply([], result);

            res.xSet(200, result, next);
        } catch (e) {
            next(e);
        }
    }
};

