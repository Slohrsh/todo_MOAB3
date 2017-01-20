angular.module('todo').factory('exchangeTodoID', function() {
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