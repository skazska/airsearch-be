/**
 * Created by ska on 6/8/17.
 */
/* webpack dependencies declarations */

//vendor
//import $ from 'jquery/src/jquery.js';
import moment from 'moment/src/moment.js';

//app modules
import Component from '../component/index.js';

//locals
import tpl from './template.html';
//import css from './style.scss';

/* searchResults */
"use strict";

var SearchResults = Component.prototype.extend(
    {
        init: function () {
            this.superclass.init.call(this, tpl);


            return this;
        },

        destroy: function () {
            return this.superclass.destroy.call(this);
        },

        /*
        [
            {
                "key": "U1U5NzUgMTUzNTcyNDAwMDAwMA==",
                "airline": {
                    "code": "SU",
                    "name": "Aeroflot"
                },
                "flightNum": 975,
                "start": {
                    "dateTime": "2018-09-01T21:54:00+10:00",
                    "airportCode": "SYD",
                    "airportName": "Kingsford Smith",
                    "cityCode": "SYD",
                    "cityName": "Sydney",
                    "countryCode": "AU",
                    "countryName": "Australia",
                    "latitude": -33.946111,
                    "longitude": 151.177222,
                    "stateCode": "NS",
                    "timeZone": "Australia/Sydney"
                },
                "finish": {
                    "dateTime": "2018-09-02T03:55:00-04:00",
                    "airportCode": "JFK",
                    "airportName": "John F Kennedy Intl",
                    "cityCode": "NYC",
                    "cityName": "New York",
                    "countryCode": "US",
                    "countryName": "United States",
                    "latitude": 40.639751,
                    "longitude": -73.778925,
                    "stateCode": "NY",
                    "timeZone": "America/New_York"
                },
                "plane": {
                    "code": "789",
                    "shortName": "Boeing 787-9",
                    "fullName": "Boeing 787-9 Dreamliner",
                    "manufacturer": "Boeing",
                    "model": "787-9"
                },
                "distance": 16014,
                "durationMin": 1201,
                "price": 1971.26
            },
        */

        render: function (data) {
            this.superclass.render.call(this, data);

            var $header = this.$tpl.find('#searchResultHeader');
            var $list = this.$tpl.find('#searchResultList');

            this._transformData(data).forEach(function (dayFlights) {
                var $dayFlights = $('<div class="day-flights col-sm-12 col-md-6 col-lg-4"></div>').appendTo($list);

                $dayFlights.append($('<h3>'+dayFlights.dt.format("dddd, MMMM Do YYYY, h:mm:ss a")+'<small>'+
                    dayFlights.tz +'</small>'+'</h3>'));


            });

            return this;
        },

        _transformData(data) {
            if (!data) data = [];
            var dates = data.reduce(
                function (dates, flight) {
                    flight.start.dateTime = moment(flight.start.dateTime);
                    flight.finish.dateTime = moment(flight.finish.dateTime);
                    var dt = flight.start.dateTime.format('YYYY-MM-DD');
                    if (!dates[dt]) dates[dt] = [];
                    dates[dt].push(flight);
                },
                {}
            );

            return Object.keys(dates).map(function (key) {
                return {dt: dates[key].start.dateTime, tz: dates[key].start.timeZone, flights: dates[key]};
            });
        }


    }
);

export default SearchResults;

