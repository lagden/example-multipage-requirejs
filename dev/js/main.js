/* global require */

'use strict';

require(['./config'], function() {
  console.log('main');
  require(['app/main']);
});
