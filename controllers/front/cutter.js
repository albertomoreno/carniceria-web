// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    template = require('../../lib/template.js');

var cutter = express.Router();
module.exports = cutter;

cutter.get('/cutter', function(req, res) {
  template.render(res, 'front/cutter/cutter');
});


