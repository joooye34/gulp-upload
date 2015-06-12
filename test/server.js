'use strict';

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
  req.file('file').upload(options,function (err, uploadedFiles) {
    if (err) {
      console.log(err.toString());
      return res.status(500).send(err.toString())
    } else {
      return res.send('successfully!');
    }
  });
});

app.listen(port);

module.exports = app;
