angular.module('todo').factory('exchangeTodoID', function() {
    var tododID = 0;
    function set(id) {
        tododID = id;
    }
    function get() {
        return tododID;
    }

    return {
        set: set,
        get: get
    }
});