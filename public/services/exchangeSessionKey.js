angular.module('todo').factory('exchangeSessionKey', function() {
    var sessionKey = 0;
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