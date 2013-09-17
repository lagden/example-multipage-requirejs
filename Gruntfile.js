"use strict";

var optsRequire = require('./options');

module.exports = function(grunt) {
    var base        = 'dev/js',
        deploy      = 'deploy',
        pathLib     = base + '/lib',
        pathBuilt   = base + '/built',
        uglifyMap   = [
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
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            app: {
                options: {
                    config: 'config.rb'
                }
            }
        },
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
                    rename: function(dest, src) {
                        return dest  + '/mustache.js';
                    }
                }, {
                    expand: true,
                    cwd: 'bower_components/jquery',
                    src: ['jquery.js'],
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
        watch: {
            compass: {
                files: ['**/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['css/**/*'],
            }
        },
        requirejs: {
            compile: {
                options: optsRequire
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['clean', 'copy']);
    grunt.registerTask('require', ['default', 'requirejs']);
};