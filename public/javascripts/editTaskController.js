'use strict';
var todoApp = angular.module("todo");

todoApp.controller("editTaskController", ['$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTaskID',
    'exchangeTodoID',
    'exchangeSessionKey',
    'exchangeValues',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeTaskID,
        exchangeTodoID,
        exchangeSessionKey,
        exchangeValues) {
    var taskId = exchangeTaskID.get();
    var todoId = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        var taskValues = exchangeValues.get();
        $scope.task = taskValues.task;
        $scope.goBack = function () {
            $location.path("/taskUI");
        }
        $scope.updateTask = function(){
            var data = {
                sessionkey : sessionKey,
                idtodos: todoId,
                idtodo_tasks: taskId,
                task: $scope.task,
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
    }
}]);