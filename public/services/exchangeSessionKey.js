angular.module('todo').factory('exchangeSessionKey', function() {
    var sessionKey = {};
    function set(key) {
        sessionKey = key;
    }
    function get() {
        return sessionKey;
    }

    return {
        set: set,
        get: get
    }
});