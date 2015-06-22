/* global define */
'use strict';

define([
  'jquery',
  'mustache',
  'app/prototype/user',
  'text!app/views/list.html'
], function($, Mustache, User, template) {

    var $add = $('#add'),
      $userList = $('#userList');

    var user = new User(null);

    $add.on('click.add', function() {
      user
        .getUser()
        .then(userCallback);
    });

    $userList.on('click.detail', '> li > div > div > .detail:button', showDetail);

    // Generate some users
    for (var i = 10; i >= 0; i--) {
      user.getUser().then(userCallback);
    }

    function userCallback(res) {
      if (res && res.results.length > 0) {
        res.results[0].user.seed = res.results[0].seed;
        $userList.append(
          Mustache.render(template, res.results[0].user)
        );
      }
    }

    function showDetail(evt) {
      var target = evt.currentTarget;
      var seed = target.getAttribute('data-seed');
      if (seed) {
        window.location = 'show.html?seed=' + seed;
      }
    }
  });