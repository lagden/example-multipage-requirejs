(function(window) {

    "use strict";

    var doc = window.document;

    // Prototype User
    // -------------------------

    function User(seed, cb) {
        this.seed = seed || null;
        this.successCallback = cb || this.success;
    }

    User.prototype.getUser = function() {
        $.ajax({
            "url": "http://randomuser.me/g/",
            "data": {
                "seed": this.seed || Math.random()
            },
            "success": this.successCallback
        });
    };

    User.prototype.success = function(res) {
        console.log(res);
    };

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return User;
        });
    } else {
        window.User = User;
    }

})(window);
