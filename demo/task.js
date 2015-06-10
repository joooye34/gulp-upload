'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var upload = require('./index');

var options = {
  server: 'http://192.168.0.77:7890/upload'
}
var callback = function(err, data, res){
  if (err) {
    console.log('error:');
    console.log(err.toString());
  } else {
    console.log(data.toString());
  }
}

gulp.task('watch', function() {
  return gulp.src('server.js')
  .pipe(upload(options, callback));
});
