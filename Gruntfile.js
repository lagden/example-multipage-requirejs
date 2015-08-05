/* global require, module */

'use strict';

var optsRequire = require('./options');

module.exports = function(grunt) {
  var base = 'dev/js';
  var deploy = 'deploy';
  var pathLib = base + '/lib';
  var pathBuilt = base + '/built';

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
          cwd: 'node_modules/mustache',
          src: ['mustache.js'],
          dest: pathLib,
          filter: 'isFile',
          rename: function(dest) {
            return dest + '/mustache.js';
          }
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
