/**
 * Created by ska on 6/7/17.
 */

/* webpack dependencies declarations */
import bootstrap from 'bootstrap-sass/assets/javascripts/bootstrap.js';
import $ from 'jquery/src/jquery.js';

import css from './main.scss';

import Navbar from './component/navbar/index.js';
import App from './component/app/index.js';

/* app root */
var $body = $('body');
var navbar = new Navbar().build($body);//.bindHandlers();
var app = new App().build($body);//.bindHandlers();
