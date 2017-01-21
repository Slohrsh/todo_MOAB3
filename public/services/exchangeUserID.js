angular.module('todo').factory('exchangeUserID', function() {
    var userID = {};
    function set(id) {
        userID = id;
    }
    function get() {
        return userID;
    }

    return {
        set: set,
        get: get
    }
});