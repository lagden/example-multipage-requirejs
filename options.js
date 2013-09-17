"use strict";

var commonExcludes = ['config', 'jquery', 'mustache', 'text'];

module.exports = {
    optimize: 'uglify2',
    generateSourceMaps: true,
    preserveLicenseComments: false,
    dir: 'deploy',
    appDir: 'dev',
    baseUrl: 'js',
    mainConfigFile: 'dev/js/config.js',
    modules: [{
        name: 'config',
        include: [
            'jquery',
            'mustache',
            'text'
        ]
    }, {
        name: 'app/main',
        exclude: commonExcludes
    }, {
        name: 'app/show',
        exclude: commonExcludes
    }]
};