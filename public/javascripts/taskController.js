'use strict';
var todoApp = angular.module("todo");

todoApp.controller("taskController", [
    'exchangeTodoID',
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTaskID',
    'exchangeSessionKey',
    'exchangeValues',
    function (exchangeTodoID,
              $scope,
              $http,
              $location,
              $mdToast,
              exchangeTaskID,
              exchangeSessionKey,
              exchangeValues) {

    var id = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        var data = {
            idtodo: id,
            sessionkey: sessionKey
        };
        $http.post('todoAPI/getSpecificTodo', data).then(function successCallback(response) {
            $scope.tasks = response.data;
            $scope.topic = $scope.tasks[0].topic;
        }, function errorCallback(response) {
            alert("KERLE WAS MACHSCH!");
        });

        $scope.goBack = function () {
            $location.path("/todoUI");
        }

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
                sessionkey : sessionKey,
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
            $location.path("/newTask");
        }

        $scope.editTask = function(task){
            exchangeTaskID.set(task.idtodo_tasks);
            exchangeValues.set(task);
            $location.path("/editTask");
        }

        $scope.updateTodo = function(todo){
            exchangeValues.set(todo);
            $location.path("/editTodo");
        }

        $scope.deleteTodo = function(){
            var data = {
                sessionkey : sessionKey,
                idtodos: id,
            };
            $http.put('todoAPI/deleteAllTasksRelatedToTodo', data).then(function successCallback(response) {
                $http.put('todoAPI/deleteSpecificTodo', data).then(function successCallback(response) {
                    $location.path("/todoUI");
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
    }
}]);