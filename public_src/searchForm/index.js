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

/* searchForm */
"use strict";

var SearchForm = Component.prototype.extend(
    {
        init: function () {
            this.superclass.init.call(this, tpl);
            return this;
        },

        destroy: function () {
            delete this.data;
            return this.superclass.destroy.call(this);
        },

        bindHandlers: function () {
            var self = this;
            self.superclass.bindHandlers.call(this);
            self.$tpl.find('form').on('submit', function( event ) {
                event.preventDefault();
                if (self._checkInputs()) self.emit('search', self.data);
            });
            return this;

        },

        _checkInputs: function () {
            var self = this;
            var result = true;

            var $from = self.$tpl.find('#flightSearchFormDepartureLocation');
            var from = $from.val();
            $from.parents('.form-group').removeClass('has-error');
            if (!/[\w- ]{3,100}/.test(from)) {
                $from.parents('.form-group').addClass('has-error');
                result = false;
            }

            var $to = self.$tpl.find('#flightSearchFormArrivalLocation');
            var to = $to.val();
            $to.parents('.form-group').removeClass('has-error');
            if (!/[\w- ]{3,100}/.test(to)) {
                $to.parents('.form-group').addClass('has-error');
                result = false;
            }

            var $date = self.$tpl.find('#flightSearchFormDate');
            var date = moment($date.val());
            $date.parents('.form-group').removeClass('has-error');
            if (!date.isValid()) {
                $date.parents('.form-group').addClass('has-error');
                result = false;
            }

            if (result) {
                self.data = {
                    from: from,
                    to: to,
                    dateFrom: date.add(-2, 'days').toDate(),
                    dateTo: date.add(2, 'days').toDate()
                }
            }
            return result;
        }

    }
);

export default SearchForm;

