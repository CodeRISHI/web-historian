var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var Promise = require('bluebird');

var fs = require('fs');
var request = require('request');
var indexUrl = '/Users/student/Codes/2016-02-web-historian/web/public/index.html';
// require more modules/folders here!
//Promisify fs
fs = Promise.promisifyAll(fs);

exports.handleRequest = function (req, res) {
  //default statusCode
  var statusCode = 200;

  var findSite;
  var archivedUrl = archive.isUrlArchived(req.url);

  //does URL exist in archive
  if (req.url === '/') {
    findSite = indexUrl;
  } else if (archivedUrl) {
    findSite = archivedUrl;
  }

  if (req.method === 'GET') {
    console.log('THIS IS GET - DO YOU GET ME?');
    // Return content of index.html
    fs.readFileAsync(findSite, 'utf8')
      .then(function(content) {
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(content);
      })
      .catch(function(err) {
        statusCode = 404;
        res.writeHead(statusCode, httpHelpers.headers);
        res.end();
      });

    // fs.readFile(findSite, 'utf8', function(err, content) {
    //   if (err) {
    //     console.log('Error! The content was not found!');
    //     statusCode = 404;
    //     res.writeHead(statusCode, httpHelpers.headers);
    //     res.end();
    //   } else {
    //     console.log('Success! The content was retrieved sucessfully!');
    //     res.writeHead(statusCode, httpHelpers.headers);
    //     res.end(content);
    //   }
    // });
  }
  
  //check request method
  if (req.method === 'POST') {
    console.log('THIS IS POST - DO YOU POST ME?');
    //if not in archive
    req.on('data', function(chunk) {
      console.log('chunk: ', JSON.parse(chunk));
      chunk = JSON.parse(chunk);
      if (!archive.isUrlInList(chunk.url)) {
        //append to sites.txt
        statusCode = 302;
        res.writeHead(statusCode, httpHelpers.headers);
        archive.addUrlToList(chunk.url);
        res.end();
      }
    });
  }
};
