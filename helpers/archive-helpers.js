var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

fs = Promise.promisifyAll(fs);

exports.readListOfUrls = function() {
  return fs.readFileAsync(exports.paths.list, 'utf8')
    .then(function(content) {
      console.log('content: ', content.split('\n'));
      return content.split('\n');
    })
    .catch(function(err) {
      console.log(err);
    });
};

exports.isUrlInList = function(url) {
  //returns boolean
  console.log('Is ' + url + ' in the url list');
  return _.contains(exports.readListOfUrls(), url);
};

exports.addUrlToList = function(url) {
  console.log('added ' + url + ' to list');
  return fs.writeFileAsync(exports.paths.list, url).catch(function(err) {
    console.log('Oops, the URL was not added.');
  });
};

exports.isUrlArchived = function(url) {
  console.log('Is ' + exports.paths.archivedSites + ' archived.');
  if (path.basename(JSON.stringify(exports.paths.archivedSites + url))) {
    return true && exports.paths.archivedSites + url;    
  } else {
    return false;
  }
};

exports.downloadUrls = function() {
};
