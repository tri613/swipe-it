var gulp = require('gulp');
var minify = require('gulp-minify');
var header = require('gulp-header');
var babel = require('gulp-babel');

var d = new Date();
var date = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
var now = [d.getFullYear(), d.getMonth()+1, date].join("/");
var pkg = require('./header.json');
var banner = [
  '/*===========================',
  '  Swipe-it v<%= pkg.version %>',
  '  <%= pkg.description %>',
  '  <%= pkg.link %>',
  ' ',
  '  @Create 2016/09/22',
  '  @Update <%= now %>',
  '  @Author Trina Lu',
  '  ===========================*/',
  ''].join('\n');

gulp.task('default', function() {
  gulp.src('./src/swipe-it.js')
    .pipe(babel({
        presets: ['es2015']
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

