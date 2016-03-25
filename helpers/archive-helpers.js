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

exports.isUrlInList = function(url, callback) {
  console.log('Is ' + url + ' in the url list');

  return exports.readListOfUrls().then(function(urls) {
    // console.log('urls: ', urls);    
    // return _.contains(urls, url);
    if (_.contains(urls, url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  console.log('added ' + url + ' to list');
  return fs.writeFileAsync(exports.paths.list, (url + '\n'))
    .then(function() {
      return callback();
    })
    .catch(function(err) {
      console.log('Oops, the URL was not added.');
    });
};

exports.isUrlArchived = function(url, callback) {
  // console.log('Is ' + exports.paths.archivedSites + ' archived.');
  if (path.basename(exports.paths.archivedSites + url)) {
    // callback(true);
    return true && exports.paths.archivedSites + url;    
  } else {
    // callback(false);
    return false;
  }
};

exports.downloadUrls = function() {
};
