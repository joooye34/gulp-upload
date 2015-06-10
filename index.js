'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var urllib = require('urllib');
var formstream = require('formstream');
var col = gutil.colors;
var path = require('path');

// consts
var PLUGIN_NAME = 'gulp-upload';

// exporting the plugin main function
module.exports = function(options, callback) {
  if (!options) {
    options = {};
  }

  if (!options || !options.server) {
    throw new PluginError(PLUGIN_NAME, 'Could not find server to upload.');
  }
  if (typeof callback !== 'function') {
    callback = function(){};
  }

  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next();

    var content = file.contents.toString();
    var form = formstream();
    form.file('file', file.path);
    form.field('path', path.relative(file.base, file.path));
    for (var key in options.data) {
      form.field(key, options.data[key]);
    }
    urllib.request(options.server, {
      method: 'post',
      headers: form.headers(),
      stream: form
    }, function (err, data, res) {
      callback(err, data, res);
    });
    return next();
  });
};
