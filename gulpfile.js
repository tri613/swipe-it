var gulp = require('gulp');
var minify = require('gulp-minify');
var header = require('gulp-header');
var babel = require('gulp-babel');
var moment = require('moment');

var now = moment().format("YYYY/MM/DD");
var pkg = require('./package.json');
var banner = [
  '/*===========================',
  '  Swipe-it v<%= pkg.version %>',
  '  <%= pkg.description %>',
  '  <%= pkg.homepage %>',
  ' ',
  '  @Create 2016/09/22',
  '  @Update <%= now %>',
  '  @Author Trina Lu',
  '  ===========================*/',
  ''].join('\n');

gulp.task('default', function() {
  return gulp.src('./src/swipe-it.js')
    .pipe(babel({
        presets: ['es2015-ie']
    }))
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
    }))
  	.pipe(header(banner,{ pkg : pkg, now: now }))
    .pipe(gulp.dest('./dist'))
});

