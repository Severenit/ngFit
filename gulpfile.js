'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');
    
var bc = './bower_components/';

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
  gulp.src(bc+'jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/development/libs/jquery/'));

  gulp.src(bc+'bootstrap/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap/'));

  gulp.src(bc+'bootstrap-material-design/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap-material-design/'));

  gulp.src([bc+'angular/angular.js',
            bc+'angular-animate/angular-animate.js',
            bc+'angular-cookies/angular-cookies.js',
            bc+'angular-i18n/angular-locale_ru-ru.js',
            bc+'angular-loader/angular-loader.js',
            bc+'angular-resource/angular-resource.js',
            bc+'angular-route/angular-route.js',
            bc+'angular-sanitize/angular-sanitize.js',
            bc+'angular-touch/angular-touch.js',
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
  'watch',
  'html',
  'app',
  'sass',
  'webserver'
]);
