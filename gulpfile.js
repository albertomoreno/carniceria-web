// Copyright (c) 2015 Alberto Moreno.
// Use of this source code is governed by a MIT-style license that
// can be found in the LICENSE.md file.

'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    rimraf = require('rimraf'),
    supervisor = require('supervisor'),
    childProcess = require('child_process'),
    _ = require('lodash');


var exec = function(cmd, done) {
  childProcess.exec(cmd, function(err, stdout, stderr) {
    // Log any stdout or stderr contents
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }

    done(err);
  });
};


gulp.task('styles:watch', function() {
  var cmd = [
    'sass',
    '--watch',
    '--scss',
    '--style expanded',
    '--precision 10',
    '--line-numbers',
    '--cache-location tmp/sass-cache',
    '--compass',
    '--load-path static/styles',
    'static/styles:tmp/assets',
  ];
  exec(cmd.join(' '));

  setTimeout(function() {
    $.watch('tmp/assets/**/*.css', {ignoreInitial: false})
      .pipe($.autoprefixer({
        browsers: ['last 3 versions'],
      }))
      .pipe(gulp.dest('tmp/styles'))
      .pipe($.livereload());
  }, 5000);
});


gulp.task('livereload', function() {
  $.watch([
    'views/**/*.nj',
  ], function(files) {
    $.livereload.reload();
  });

  $.livereload.listen();
});


gulp.task('supervisor', function() {
  supervisor.run(['index.js']);
});


gulp.task('default', function () {
  $.util.log($.util.colors.red('Specify a task'));
});


gulp.task('clean', function() {
  rimraf.sync('tmp/styles');
  rimraf.sync('tmp/scripts');
  rimraf.sync('tmp/assets');
});


gulp.task('images:build', function(taskDone) {
    var images = 'src/images/*.{jpg,gif,png,svg}';
    return gulp.src(images)
      .pipe($.cache($.imagemin({progressive: true, interlaced: true})))
      // Renaming sets the correct path for cached files so we leave them in the
      // correct final folder.
      .pipe($.rename({dirname: '.'}))
      .pipe(gulp.dest('src/static/images/'))
});


gulp.task('serve', function(done) {
  runSequence(
    'clean',
    [
      'scripts:vendor',
    ],
    [
      'styles:watch',
      'livereload',
      'supervisor'
    ],
    done
  );
});


gulp.task('scripts:vendor', function() {
  var files = [
    'node_modules/jquery/dist/jquery.min,js',
  ];
  return gulp.src(files)
    .pipe(gulp.dest('static/vendor'));
});


gulp.task('styles:build', function(done) {
  var cmd = [
    'sass',
    '--scss',
    '--style compressed',
    '--precision 10',
    '--cache-location tmp/sass-cache',
    '--compass',
    '--load-path static/styles',
    'static/styles:tmp/assets',
  ];
  exec(cmd.join(' '), done);
});


gulp.task('styles:autoprefix', function() {
  return gulp.src('tmp/assets/*.css')
    .pipe($.autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(gulp.dest('tmp/styles'));
});


gulp.task('scripts:concat-vendor', function() {
  return gulp.src(vendorFiles)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('tmp/scripts'));
});


gulp.task('build', function(done) {
  runSequence(
    'clean',
    'styles:build',
    'images:build',
    [
      'fonts:publish',
    ],
    [
      'styles:autoprefix',
    ],
    'rev',
    done
  )
});
