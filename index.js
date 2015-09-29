// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path');

var app = express();

// Middlewares
app.use('/tmp/styles', express.static(path.join(__dirname, 'tmp', 'styles')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(require('./controllers/front/home'));


nunjucks.configure({ noCache: true });

// Start server
app.listen(8000, function () {
  console.log('server listening in http://localhost:8000');
});

