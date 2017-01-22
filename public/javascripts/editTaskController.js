'use strict';
var todoApp = angular.module("todo");

todoApp.controller("editTaskController", ['$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTaskID',
    'exchangeTodoID',
    'exchangeSessionKey',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeTaskID,
        exchangeTodoID,
        exchangeSessionKey) {
    var taskId = exchangeTaskID.get();
    var todoId = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();

    $scope.updateTask = function(){
        var data = {
            sessionkey : sessionKey,
            idtodos: todoId,
            idtodo_tasks: taskId,
            task: $scope.todo.task,
            isdone: 0
        };
        $http.put('todoAPI/updateTask', data).then(function successCallback(response) {
            $location.path("/taskUI");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't update Task. Please try it later")
                    .hideDelay(3000)
            );
        });
    };

    $scope.deleteTask = function () {
        var data = {
            sessionkey : sessionKey,
            idtodos: todoId,
            idtodo_tasks: taskId
        };
        $http.put('todoAPI/deleteSpecificTask', data).then(function successCallback(response) {
            $location.path("/taskUI");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't update Task. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);