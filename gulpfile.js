var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');

gulp.task('app', function() {
  gulp.src('builds/development/js/**/*')
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

gulp.task('webserver', function() {
  gulp.src('builds/development/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('copyjquery', function() {
  gulp.src('./bower_components/jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/development/libs/jquery/'));
});

gulp.task('copybootstrap', function() {
  gulp.src('./bower_components/bootstrap/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap/'));
});
gulp.task('copybootstrapmaterialdesign', function() {
  gulp.src('./bower_components/bootstrap-material-design/dist/**/*.*')
      .pipe(gulp.dest('./builds/development/libs/bootstrap-material-design/'));
});


gulp.task('default', [
  'copyjquery',
  'copybootstrap',
  'copybootstrapmaterialdesign',
  'watch',
  'html',
  'app',
  'sass',
  'webserver'
]);