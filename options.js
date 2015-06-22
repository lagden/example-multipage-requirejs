/* global module */
'use strict';

var commonExcludes = ['../config'];

module.exports = {
  optimize: 'uglify2',
  generateSourceMaps: false,
  preserveLicenseComments: false,
  useStrict: true,
  dir: 'deploy',
  appDir: 'dev',
  baseUrl: 'js/lib',
  mainConfigFile: 'dev/js/config.js',
  keepAmdefine: false,
  modules: [{
    name: '../config',
    include: [
      'jquery',
      'mustache',
      'text'
    ]
  }, {
    name: '../main',
    exclude: commonExcludes
  }, {
    name: '../show',
    exclude: commonExcludes
  }]
};
