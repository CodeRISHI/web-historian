var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

var fs = require('fs');
var request = require('request');
var indexUrl = '/Users/student/Codes/2016-02-web-historian/web/public/index.html';
// require more modules/folders here!

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

  // console.log('findSite: ', findSite);

  //read list of URLs
  // archive.readListOfUrls();
  // console.log('Should be array of URLs: ', archive.readListOfUrls());


  if (req.method === 'GET') {
    // Return content of index.html
    fs.readFile(findSite, 'utf8', function(err, content) {
      if (err) {
        console.log('Error! The content was not found!');
        statusCode = 404;
        res.writeHead(statusCode, httpHelpers.headers);
        res.end();
      } else {
        console.log('Success! The content was retrieved sucessfully!');
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(content);
      }
    });
  }
  
  //check request method
  if (req.method === 'POST') {
    //if not in archive
    req.on('data', function(chunk) {
      console.log('chunk: ', JSON.parse(chunk));
      chunk = JSON.parse(chunk);
      if (!archive.isUrlInList(chunk.url)) {
        //append to sites.txt
        statusCode = 302;
        res.writeHead(statusCode, httpHelpers.headers);
        archive.addUrlToList(chunk.url);
      }
    });
  }
};
