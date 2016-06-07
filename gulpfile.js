var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');

//===============================
//                JAVASCRIPTS
//===============================

/**
 * uglified admin JS task
 */
gulp.task('uglified-admin-js', function () {
    return gulp.src('./public/javascripts/admin/*.js')
        .pipe(concat('admin.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/admin/'));
});

/**
 * uglified input JS task
 */
gulp.task('uglified-input-js', function () {
    return gulp.src('./public/javascripts/input/*.js')
        .pipe(concat('input.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/input/'));
});

/**
 * uglified layout JS task
 */
gulp.task('uglified-layout-js', function () {
    return gulp.src('./public/javascripts/layout/*.js')
        .pipe(concat('layout.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/layout/'));
});

/**
 * uglified preview JS task
 */
gulp.task('uglified-preview-js', function () {
    return gulp.src('./public/javascripts/preview/*.js')
        .pipe(concat('preview.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/preview/'));
});

/**
 * uglified template JS task
 */
gulp.task('uglified-template-js', function () {
    return gulp.src('./public/javascripts/template/*.js')
        .pipe(concat('template.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/template/'));
});

/**
 * uglified common JS task
 */
gulp.task('uglified-common-js', function () {
    return gulp.src(['./public/javascripts/change-pass-validation.js', './public/javascripts/jquery.min.js',
        './public/javascripts/login-validation.js', './public/javascripts/main.js', './public/javascripts/register-validation.js',
        './public/javascripts/reset-complete-validation.js', './public/javascripts/reset-validation.js',])
        .pipe(concat('common.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/common/'));
});


// images compressed task
gulp.task('image-compressed', function () {
    gulp.src('./public/images/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./gulp-build/images/'));

});

//===============================
//                CSS
//=============================== 

/**
 * uglified template-css task
 */
gulp.task('uglified-template-css', function () {
    return gulp.src('./public/stylesheets/template-css/*.css')
        .pipe(concat('template-css.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/template-css/'));
});

/**
 * uglified less-css task
 */
gulp.task('uglified-less-css-styles', function () {
    return gulp.src('./public/stylesheets/less/css/styles.css')
        .pipe(concat('less-css-styles.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/less-css-styles/'));
});

/**
 * uglified less task
 */
gulp.task('uglified-less-css', function () {
    return gulp.src('./public/stylesheets/less/**/*.less')
        .pipe(concat('less.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/less/'));
});

// common css task
gulp.task('uglified-common-css', function () {
    return gulp.src('./public/stylesheets/404.css', './public/stylesheets/500.css', './public/stylesheets/admin.css',
        './public/stylesheets/auth-layout.css', './public/stylesheets/input-css.css',
        './public/stylesheets/layout-css.css', './public/stylesheets/style.css')
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/common/'));
});

/**
 * uglified 500 css task
 */
gulp.task('uglified-500-css', function () {
    return gulp.src('./public/stylesheets/500.css')
        .pipe(concat({path: '500.min.css', stat: {mode: 0666}}))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/500/'));
});

/**
 * uglified admin css task
 */
gulp.task('uglified-admin-css', function () {
    return gulp.src('./public/stylesheets/admin.css')
        .pipe(concat({path: 'admin.min.css', stat: {mode: 0666}}))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/admin/'));
});


//===============================
//        BUNDLE ALL JS & CSS
//===============================

/**
 * bundle JS task
 */
gulp.task('bundle-js', function () {
    return gulp.src('./public/javascripts/**/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/js/bundle/'));
});

/**
 * bundle CSS task
 */
gulp.task('bundle-css', function () {
    return gulp.src('./public/stylesheets/**/*.css')
        .pipe(concat('bundle.min.css'))
        .pipe(uglify())
        .pipe(gulp.dest('./gulp-build/css/bundle/'));
});


/**
 * JS & IMAGES task
 */
gulp.task('uglified-js', ['uglified-admin-js', 'uglified-input-js', 'uglified-layout-js'
    , 'uglified-preview-js', 'uglified-template-js', 'uglified-common-js', 'image-compressed']);


/**
 * CSS & LESS task
 */
gulp.task('uglified-css', ['uglified-template-css', 'uglified-less-css-styles', 'uglified-less-css', 'uglified-common-css']);

/**
 * default task
 */
gulp.task('default', ['uglified-js', 'uglified-css']);


