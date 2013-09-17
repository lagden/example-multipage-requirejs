"use strict";

define(['jquery', 'mustache', 'text!app/views/user.html'], function($, Mustache, user) {
    
    var $add      = $('#add'),
        $userList = $('#userList');

    $add.on('click.add', getUser);

    function getUser() {
        $.ajax({
            url: 'http://randomuser.me/g/',
            data: {
                "seed": Math.random()
            },
            success: function(res) {
                if (res.results.length > 0) {
                    res.results[0].user.name.title = ucFirst(res.results[0].user.name.title);
                    res.results[0].user.name.fullname = fullname(res.results[0].user.name);
                    $userList.append(
                        Mustache.render(user, res.results[0].user)
                    );
                }
            }
        });
    }

    function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function fullname(obj) {
        return ucFirst(obj.first) + ' ' + ucFirst(obj.last);
    }
});
