/* global define, requirejs */

'use strict';

define('config', function() {

  // Get Parameter from Querystring
  function getParameterByName(name) {
    name = name.replace(/[\[]/, '[').replace(/[\]]/, ']');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Retorna o o dir atual ex.: http://xxx.com/dir/awesome/index.html -> /dir/awesome
  function urlPath() {
    var path = String(window.location.pathname).split('/');
    path.pop();
    return path.join('/');
  }

  window.urlPath = urlPath;
  window.getParameterByName = getParameterByName;

  requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      'app': '../app'
    }
  });

});
