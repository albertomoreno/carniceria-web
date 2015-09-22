'use strict';

var express = require('express'),
    template = require('../../lib/template.js');

var home = express.Router();
module.exports = home;

home.get('/', function(req, res) {
  template.render(res, 'front/home/home');
});

