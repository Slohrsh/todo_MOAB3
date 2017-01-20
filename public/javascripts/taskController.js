'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("taskController", ['exchangeTodoID', '$scope', '$http', '$location', function (exchangeTodoID, $scope, $http, $location) {
    var id = 1; //exchangeTodoID.get();

    $http({
        method: 'GET',
        url: 'todoAPI/getSpecificTodo/' + id
    }).then(function successCallback(response) {

        $scope.tasks = response.data;
        $scope.topic = $scope.tasks[0].topic;
    }, function errorCallback(response) {
        alert("KERLE WAS MACHSCH!");
    });

    $scope.updateTaskIsDone = function(task){
        $scope.taskToChange = task;
        var isDone = task.isDone;
        if(isDone == 1){
            task.isDone = 0;
        }else{
            task.isDone = 1;
        }
        $scope.updateTaskInDB(task);
    };

    $scope.updateTaskInDB = function(task){
        var data = {
            idtodos: id,
            idtodo_tasks: task.idtodo_tasks,
            task: task.task,
            isdone: task.isDone
        };
        $http.put('todoAPI/updateTask', data).then(function successCallback(response) {
            $scope.updateTasks(task);
        }, function errorCallback(response) {
            alert("KERLE WAS MACHSCH!");
        });
    };

    $scope.updateTasks = function (newTask) {
        $scope.tasks[newTask.idtodo_tasks-1] = newTask;
    }
}]);