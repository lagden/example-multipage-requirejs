/* global define, window */
'use strict';

define([
  'jquery',
  'mustache',
  'app/prototype/user',
  'text!app/views/detail.html',
  'text!app/views/404.html'
], function($, Mustache, User, template, error404) {

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

  var $back = $('#volta'),
    $userDetail = $('#userDetail'),
    seed = getParameterByName('seed'),
    user;

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
    window.location = urlPath() + '/index.html';
  });
});
