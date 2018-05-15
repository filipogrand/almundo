'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gulpNgConfig = require('gulp-ng-config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function() {
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return buildScripts();
});

gulp.task('config:local', function() {
    gulp.src(path.join(conf.paths.src, '../env.json'))
        .pipe(gulpNgConfig('app', {
            createModule: false,
            wrap: true,
            environment: 'local'
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/app/components/angular-env-vars/')))
});

gulp.task('config:staging', function() {
    gulp.src(path.join(conf.paths.src, '../env.json'))
        .pipe(gulpNgConfig('app', {
            createModule: false,
            wrap: true,
            environment: 'staging'
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/app/components/angular-env-vars/')))
});

gulp.task('config:production', function() {
    gulp.src(path.join(conf.paths.src, '../env.json'))
        .pipe(gulpNgConfig('app', {
            createModule: false,
            wrap: true,
            environment: 'production'
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/app/components/angular-env-vars/')))
});

function buildScripts() {
    return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.size())
};