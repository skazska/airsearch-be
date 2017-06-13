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

var Component = Common.prototype.extend(
    {
        destroy: function() {
            delete this.template;
            delete this.data;
            delete this.context;
            delete this.$tpl;

            return this.superclass.destroy.call(this);
        },

        init: function (template, data, context) {
            this.template = template;
            this.data = data || {};
            this.context = context || {};

            return this;
        },

        render: function (data) {
            var _data = Object.assign({}, this.data, data || {});
            this.$tpl = $(this.template);
            this.$tpl.find('*[data-placeholder]')
                .each(function (i, elt) {
                    var $elt = $(elt);
                    var dataKey = $elt.data('placeholder');
                    $elt.text(_data[dataKey]);
                });

            return this;
        },

        appendTo: function (cont) {
            this.$tpl.appendTo(cont);
            return this;
        },

        bindHandlers: function () {

            return this;
        },

        build: function (cont, template, data) {
            this
                .init(template, data)
                .render()
                .appendTo(cont)
                .bindHandlers();
            return this;
        },

        rebuild: function (cont, data) {
            cont.empty();
            this
                .render(data)
                .appendTo(cont)
                .bindHandlers();
            return this;

        }

    }
);


export default Component;

