/**
 * Created by ska on 6/8/17.
 */

/* webpack dependencies declarations */

//vendor
import $ from 'jquery/src/jquery.js';

//app modules
import Common from '../common/index.js';

/* component */

"use strict";

var Service = Common.prototype.extend(
    {
        destroy: function() {
            delete this.url;

            return this.superclass.destroy.call(this);
        },

        init: function (url) {
            this.url = url;

            return this;
        },

        query: function (params, url) {
            var self = this;
            $.get(url||this.url, params)
                .done(function (data) {
                    self.emit('data', data);
                })
                .fail(function (jqxhr, textStatus, error) {
                    self.emit('error', error);
                });
            return this;
        },


    }
);


export default Service;

