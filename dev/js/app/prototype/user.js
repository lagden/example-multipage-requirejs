/* global define, jQuery, console */
'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        root.User = factory(jQuery);
    }
}(this, function ($) {

  function User(seed, cb) {
    this.seed = seed || null;
    this.successCallback = cb || this.success;
  }

  User.prototype.getUser = function() {
    var seed = this.seed || Math.random();
    $.support.cors = true;
    var rndUser = 'http://randomuser.me/g/';
    return $.getJSON('http://cors.lagden.in/call', {
      url: rndUser,
      data: {
        'seed': seed
      }
    });
  };

  User.prototype.success = function(res) {
    console.log(res);
  };

  return User;

}));
