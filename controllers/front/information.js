// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    template = require('../../lib/template.js');


module.exports = {
  contact: function(req, res) {
    template.render(res, 'front/information/contact');
  },

  about_us: function(req, res) {
    template.render(res, 'front/information/about_us');
  },
};
