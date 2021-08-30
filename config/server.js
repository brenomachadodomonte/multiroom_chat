/* Imports: Express, Consign, Body parser, Express Validator */
var express = require('express');
var consign = require('consign');
var bodyParser =require('body-parser');
var expressValidator = require('express-validator');

/* Init & Config*/
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Middlewares */
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

/* Autoloads: Routes, Models, Controllers */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* Export */
module.exports = app;
