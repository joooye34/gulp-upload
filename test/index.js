'use strict';

var assert = require('assert');
var fs = require('fs');
var gulp = require('gulp');
var upload = require('../index');

var fileName = Math.floor(Math.random()*10000) + '.html';
var dirname = '/upload';
var content = 'Hello, gulp-upload.';

var options = {
  server: 'http://127.0.0.1:7890/upload',
  data: {
    dirname: dirname,
    fileName: fileName
  }
}

describe('gulp-upload', function() {
  it('should upload successfully', function(done) {
    var app = require('./server');
    fs.writeFileSync(__dirname + '/source/' + fileName, content, 'utf-8');

    gulp.task('test', function() {
      return gulp.src(__dirname + '/source/' + fileName)
      .pipe(upload(options))
      .on('end', function(){
        var destFile = fs.readFileSync(__dirname + dirname + '/' + fileName, 'utf-8');
        assert.equal(content, destFile.toString());

        done();
      });
    });

    gulp.start('test');
  });
});
