/* webpack dependencies declarations */
//vendor
import $ from 'jquery/src/jquery.js';

//app modules
import Component from '../index.js';
import Form from '../searchForm/index.js';
import Results from '../searchResults/index.js';
import FlightService from '../../service/flight/index.js';

//locals
import tpl from './template.html';
//import css from './style.scss';

/* app */
"use strict";

var App = Component.prototype.extend(
    {
        init: function () {
            this.superclass.init.call(this, tpl);
            this.form = new Form();
            this.results = new Results();
            this.searchService = new FlightService().init();

            return this;
        },

        destroy: function () {
            this.results.destroy();
            this.form.destroy();
            this.searchService.destroy();

            return this.superclass.destroy.call(this);
        },

        render: function () {
            this.superclass.render.call(this);

            this.form.build(this.$tpl.find('#searchForm'));

            this.results.build(this.$tpl.find('#searchResults'));


            return this;
        },

        bindHandlers: function () {
            var self = this;
            self.superclass.bindHandlers.call(this);

            //this.form.bindHandlers();

            self.searchService
                .on('data', function (data) {
                    console.log(data);
                    self.results.rebuild(self.$tpl.find('#searchResults'), data);
                })
                .on('error', function (err) {
                    console.error(err);
                });

            self.form.on('search', function (params) {
                console.log(params);
                self.searchService.query(params);
            });

            return self;
        }

    }
);

export default App;
