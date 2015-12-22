// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    template = require('../../lib/template.js');

var information = express.Router();
module.exports = information;

information.get('/contact', function(req, res) {
  template.render(res, 'front/information/contact');
});

information.get('/aboutus', function(req, res) {
  template.render(res, 'front/information/about_us');
});


