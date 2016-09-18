'use strict';

var path = require('path');
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
  var filePath = path.join(__dirname, fileName);
  var destPath = path.join(__dirname, dirname, fileName);

  afterEach(function () {
    fs.unlinkSync(filePath);
    fs.unlinkSync(destPath);
  })

  it('should upload successfully', function(done) {
    var app = require('./server');
    fs.writeFileSync(filePath, content, 'utf-8');

    gulp.task('test', function() {
      return gulp.src(filePath)
      .pipe(upload(options))
      .on('end', function(){
        var destFile = fs.readFileSync(destPath, 'utf-8');
        assert.equal(content, destFile.toString());

        done();
      });
    });

    gulp.start('test');
  });
});
