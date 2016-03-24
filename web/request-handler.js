var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

var fs = require('fs');
var request = require('request');
var indexUrl = '/Users/student/Codes/2016-02-web-historian/web/public/index.html';
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  if (req.url === '/') {

    // request(indexUrl, function());

    var indexFile = fs.readFile(indexUrl, 'utf8', function(err, content) {
      if (err) {
        console.log(err);
      } else {
        // console.log(content, typeof content);
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(content);

      }
    });
    
  }
  // res.end(archive.paths.list);

};
