angular.module('todo').factory('exchangeTaskID', function() {
    var taskID = {};
    function set(id) {
        taskID = id;
    }
    function get() {
        return taskID;
    }

    return {
        set: set,
        get: get
    }
});