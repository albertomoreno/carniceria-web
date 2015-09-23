// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var nunjucks = require('nunjucks');

module.exports = {
  render: function(res, view, data) {
    res.send(nunjucks.render('views/' + view + '.nj', data));
  },
};

