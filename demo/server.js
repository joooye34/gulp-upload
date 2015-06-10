'use strict';

var express = require('express');
var skipper = require('skipper');

var app = express();
var port = 7890;

app.post('/upload', skipper());
app.post('/upload', function(req, res){
  var path = req.body.path;
  req.file('file').upload({
    dirname: __dirname + '/upload',
    saveAs: path
  },function (err, uploadedFiles) {
    if (err) return res.send(500, err);
    return res.json({
      message: uploadedFiles.length + ' file(s) uploaded successfully!',
      files: uploadedFiles
    });
  });
});

app.listen(port, function(){
  port = (port !== '80' ? ':' + port : '');
  var url = 'http://localhost'  + port + '/';
  console.log('Running at ' + url);
});
