'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("taskController", ['exchangeTodoID', '$scope', '$http', '$window', '$mdToast', function (exchangeTodoID, $scope, $http, $window, $mdToast) {
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
            $mdToast.show(
                $mdToast.simple()
                    .textContent("There was an error updating the Task. Pleasy try it later.")
                    .hideDelay(3000)
            );
        });
    };

    $scope.updateTasks = function (newTask) {
        $scope.tasks[newTask.idtodo_tasks-1] = newTask;
    }

    $scope.addNewTask = function(){
        $window.location = "newTask";
    }

    $scope.editTask = function(){
        $window.location = "editTask";
    }

    $scope.updateTodo = function(){
        $window.location = "editTodo";
    }

    $scope.deleteTodo = function(){
         var data = {
            idtodos: id,
        };
        $http.put('todoAPI/deleteAllTasksRelatedToTodo', data).then(function successCallback(response) {
            $http.put('todoAPI/deleteSpecificTodo', data).then(function successCallback(response) {
                $window.location = "todoUI";
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Can't delete Todo. Pleas try it later.")
                        .hideDelay(3000)
                );
            });
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't delete Todo. Pleas try it later.")
                    .hideDelay(3000)
            );
        });
    }
}]);