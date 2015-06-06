'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');
    
var bower_components = './bower_components/';

gulp.task('app', function() {
  gulp.src('builds/development/app/**/*')
});

gulp.task('html', function() {
  gulp.src('builds/development/**/*.html')
});

gulp.task('sass', function () {
  gulp.src('builds/development/sass/**/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(csso())
      .pipe(gulp.dest('builds/development/css/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/app/**/*', ['app']);
  gulp.watch('builds/development/sass/**/*', ['sass']);
  gulp.watch('builds/development/**/*.html', ['html']);
});

gulp.task('libs', function() {
  gulp.src(bower_components+'jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/development/libs/jquery/'));

  gulp.src(bower_components+'bootstrap/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap/'));

  gulp.src(bower_components+'bootstrap-material-design/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap-material-design/'));

  gulp.src([bower_components+'angular/angular.js',
            bower_components+'angular-animate/angular-animate.js',
            bower_components+'angular-cookies/angular-cookies.js',
            bower_components+'angular-i18n/angular-locale_ru-ru.js',
            bower_components+'angular-loader/angular-loader.js',
            bower_components+'angular-resource/angular-resource.js',
            bower_components+'angular-route/angular-route.js',
            bower_components+'angular-sanitize/angular-sanitize.js',
            bower_components+'angular-touch/angular-touch.js',
          ])
      .pipe(gulp.dest('./builds/development/libs/angular/'));
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
  'libs',
  'html',
  'app',
  'sass',
  'webserver',
  'watch'
]);
