/**
 * Created by ska on 6/8/17.
 */
/* webpack dependencies declarations */

//vendor
//import $ from 'jquery/src/jquery.js';

//app modules
import Component from '../component/index.js';

//locals
import tpl from './template.html';
//import css from './style.scss';

/* navbar */
"use strict";

var Navbar = Component.prototype.extend(
    {
        init: function () {
            this.superclass.init.call(this, tpl, {projectName: 'Flight search'});
            return this;
        }

    }
);

export default Navbar;

