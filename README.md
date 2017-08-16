# gulp-upload v1.0.0

> Use urllib to upload file to remote server.


## Install

```
npm install --save-dev gulp-upload
```


## Example

### client

```js
var gulp = require('gulp');
var upload = require('gulp-upload');

var options = {
  server: 'http://192.168.0.77:7890/upload',
  data: {
    dirname: 'upload',
    fileName: 'dest.js'
  },
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
```

### options.data
```js
var gulp = require('gulp')
var upload = require('gulp-upload')
var path = require('path')

var options = {
  server: 'http://192.168.0.77:7890/upload',
  data: {
    fileName: function(file) {
      return path.relative(__dirname, file.path)
    }
  }
}

gulp.task('watch', function () {
  return watch('src/**/*.html')
    .pipe(upload(options))
})
```

### server

```js
var express = require('express');
var skipper = require('skipper');

var app = express();
var port = 7890;

app.post('/upload', skipper());
app.post('/upload', function(req, res){
  var body = req.body || {};

  var options = {
    dirname: __dirname + (body.dirname || ''),
    saveAs: body.fileName
  };
  req.file('file').upload(options, function (err, uploadedFiles) {
    if (err) {
      return res.status(500).send(err.toString())
    } else {
      return res.send('successfully!');
    }
  });
});

app.listen(port, function(){
  port = (port !== '80' ? ':' + port : '');
  var url = 'http://localhost'  + port + '/';
  console.log('Running at ' + url);
});
```

## plugin options
Option     | Type                             | Description
---------- | -------------------------------- | --------------
server     | ((string))(_required_)           | Remote server to upload.
data       | ((object))                       | The data will put in the field and send to server.If it is a function, it should return result.
fileinputname | ((string))                    | To define the name of API.

## urllib options
[https://github.com/node-modules/urllib#api-doc](https://github.com/node-modules/urllib#api-doc)

## License

MIT
