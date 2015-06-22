/* global require, module */

'use strict';

var optsRequire = require('./options');

module.exports = function(grunt) {
  var base = 'dev/js',
    deploy = 'deploy',
    pathLib = base + '/lib',
    pathBuilt = base + '/built',
    uglifyMap = [
      pathLib + '/require.js',
      pathLib + '/jquery.js',
      pathLib + '/mustache.js',
      pathLib + '/text.js'
    ],
    uglifyFiles = [];

  for (var i = uglifyMap.length - 1; i >= 0; i--) {
    var obj = {};
    obj[uglifyMap[i]] = [uglifyMap[i]];
    uglifyFiles.push(obj);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      app: {
        src: [pathBuilt, pathLib, deploy]
      }
    },
    copy: {
      app: {
        files: [{
          expand: true,
          cwd: 'bower_components/requirejs',
          src: ['require.js'],
          dest: pathLib,
          filter: 'isFile'
        }, {
          expand: true,
          cwd: 'node_modules/mustache',
          src: ['mustache.js'],
          dest: pathLib,
          filter: 'isFile',
          rename: function(dest) {
            return dest + '/mustache.js';
          }
        }, {
          expand: true,
          flatten: true,
          cwd: 'bower_components/jquery',
          src: ['dist/jquery.js'],
          dest: pathLib,
          filter: 'isFile'
        }, {
          expand: true,
          cwd: 'bower_components/text',
          src: ['text.js'],
          dest: pathLib,
          filter: 'isFile'
        }]
      }
    },
    requirejs: {
      compile: {
        options: optsRequire
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['clean', 'copy']);
  grunt.registerTask('deploy', ['default', 'requirejs']);
};
