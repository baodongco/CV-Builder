var gulp = require('gulp');
var	uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');

/**
 * uglified admin JS task
 */
gulp.task('uglified-admin-js', function() {
  return gulp.src('./public/javascripts/admin/*.js')
    .pipe(concat('admin.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/admin/'));
});

/**
 * uglified input JS task
 */
gulp.task('uglified-input-js', function() {
  return gulp.src('./public/javascripts/input/*.js')
    .pipe(concat('input.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/input/'));
});

/**
 * uglified layout JS task
 */
gulp.task('uglified-layout-js', function() {
  return gulp.src('./public/javascripts/layout/*.js')
    .pipe(concat('layout.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/layout/'));
});

/**
 * uglified preview JS task
 */
gulp.task('uglified-preview-js', function() {
  return gulp.src('./public/javascripts/preview/*.js')
    .pipe(concat('preview.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/preview/'));
});

/**
 * uglified template JS task
 */
gulp.task('uglified-template-js', function() {
  return gulp.src('./public/javascripts/template/*.js')
    .pipe(concat('template.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/template/'));
});

/**
 * uglified common JS task
 */
gulp.task('uglified-common-js', function() {
  return gulp.src('./public/javascripts/common/*.js')
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/common/'));
});


// images compressed task
gulp.task('image-compressed', function(){
  gulp.src('./public/images/**/*.png')
  .pipe(imagemin())
  .pipe(gulp.dest('./gulp-build/images/'));  

});

/**
 * bundle JS task
 */
gulp.task('bundle-js', function() {
  return gulp.src('./public/javascripts/**/*.js')
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./gulp-build/js/bundle/'));
});



/**
 * default task
 */
gulp.task('default', ['uglified-admin-js', 'uglified-input-js', 'uglified-layout-js'
	, 'uglified-preview-js', 'uglified-template-js', 'image-compressed', 'bundle-js']);


