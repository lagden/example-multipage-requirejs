/* global define */
'use strict';

define([
  'jquery',
  'mustache',
  'app/prototype/user',
  'text!app/views/detail.html',
  'text!app/views/404.html'
], function($, Mustache, User, template, error404) {

  var $back = $('#volta'),
    $userDetail = $('#userDetail'),
    seed = window.getParameterByName('seed'),
    user;

  if (seed) {
    user = new User(seed);
    user.getUser().then(userCallback);
  } else {
    $userDetail.append(
      Mustache.render(error404, {
        '404': 'User not found!'
      })
    );
  }

  $back.on('click.back', function() {
    window.location = window.urlPath() + '/index.html';
  });

  function userCallback(res) {
    if (res.results.length > 0) {
      res.results[0].user.name.title = ucFirst(res.results[0].user.name.title);
      res.results[0].user.name.fullname = fullname(res.results[0].user.name);
      res.results[0].user.ucFirstAll = ucFirstAll;
      $userDetail.append(
        Mustache.render(template, res.results[0].user)
      );
    }
  }

  function ucFirstAll() {
    return function(text, render) {
      var txtArray = render(text).split(' ');
      return txtArray.map(ucFirst).join(' ');
    };
  }

  function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function fullname(obj) {
    return ucFirst(obj.first) + ' ' + ucFirst(obj.last);
  }
});
