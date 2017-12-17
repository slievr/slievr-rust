var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var transform = require('vinyl-transform');
var streamify = require('gulp-streamify');
var wait = require('gulp-wait');

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
*/

gulp.task('scripts', function() {
    return browserify('./js/app.js')
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .pipe(wait(1500)) // time delay so ftp finished transfering
        .on('error', function(e) {
            gutil.log(e);
        })
        .pipe(source('bundle.main.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('../../public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile SASS stylesheets.
 |--------------------------------------------------------------------------
 */
var external_styles = [
    './node_modules/normalize.css/normalize.css',
    './sass/app.scss'
];

gulp.task('styles', function() {
  return gulp.src(external_styles)
    .pipe(wait(1500))
    .pipe(concat('main.css'))
    .pipe(sassGlob())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('../../public/css'));
});


gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', gulp.series('styles'));
  gulp.watch('./js/components/*.js', gulp.parallel('scripts'));
  gulp.watch('./js/*.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('styles', 'scripts','watch'));
