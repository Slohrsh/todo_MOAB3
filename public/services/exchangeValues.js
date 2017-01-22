angular.module('todo').factory('exchangeValues', function() {
    var values = {};
    function set(val) {
        values = val;
    }
    function get() {
        return values;
    }

    return {
        set: set,
        get: get
    }
});