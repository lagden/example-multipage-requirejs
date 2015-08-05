/* global define, requirejs */

'use strict';

define('config', function() {

  requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      'app': '../app'
    }
  });

});
