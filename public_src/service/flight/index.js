/**
 * Created by ska on 6/8/17.
 */

/* webpack dependencies declarations */

//vendor
import $ from 'jquery/src/jquery.js';

//app modules
import Service from '../index.js';

/* component */

"use strict";

var FlightService = Service.prototype.extend(
    {
        destroy: function() {
            delete this.url;

            return this.superclass.destroy.call(this);
        },

        init: function () {
            return this.superclass.init.call(this,'http://localhost:3000/api/search');
        },

        query: function (params, url) {
            var p = {
                from: params.from,
                to: params.to,
                dateFrom: params.dateFrom.format('YYYY-MM-DD'),
                dateTo: params.dateTo.format('YYYY-MM-DD')
            };
            return this.superclass.query.call(this, p, url);
        },


    }
);


export default FlightService;

