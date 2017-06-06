/**
 * Created by ska on 6/6/17.
 */

'use strict';

const
    express = require('express'),
    router = express.Router(),
    airline = require('../controllers/airline.js'),
    airport = require('../controllers/airport.js'),
    flightSearch = require('../controllers/flight-search.js');


/* GET airlines */
router.route('/airlines')
    .get(airline.getList);

/* GET airports */
router.route('/airports')
    .get(airport.getList);

/* GET flights */
router.route('/search')
    .get(flightSearch.getList);


module.exports = router;
