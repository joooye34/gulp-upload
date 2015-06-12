'use strict';

var gulp = require('gulp');
var upload = require('gulp-upload');

var options = {
  server: 'http://192.168.0.77:7890/upload',
  data: {
    dirname: 'upload',
    fileName: 'dest.js'
  }
  callback: function (err, data, res) {
    if (err) {
      console.log('error:' + err.toString());
    } else {
      console.log(data.toString());
    }
  }
}

gulp.task('upload', function() {
  return gulp.src('server.js')
  .pipe(upload(options));
});
