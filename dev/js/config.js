"use strict";

// Console
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Get Parameter from Querystring
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Retorna o o dir atual ex.: http://xxx.com/dir/awesome/index.html -> /dir/awesome
function urlPath() {
    var path = String(window.location.pathname).split('/');
    path.pop();
    return path.join('/');
}

require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/jquery",
        "mustache": "lib/mustache",
        "text": "lib/text"
    }
});