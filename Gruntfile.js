module.exports = function(grunt) {
    "use strict";

    var base        = 'js',
        pathBuilt   = base + '/built',
        pathLib     = base + '/lib',
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
                src: [pathBuilt, pathLib]
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
        uglify: {
            app: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                    properties: true,
                    preserveComments: false,
                    compress: {
                        global_defs: {
                            "DEBUG": false
                        },
                        dead_code: true
                    }
                },
                files: uglifyFiles
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.registerTask('default', ['compass', 'clean', 'copy', 'uglify']);
    grunt.registerTask('default', ['clean', 'copy', 'uglify']);
};