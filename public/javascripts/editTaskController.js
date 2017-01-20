'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("editTaskController", ['$scope', '$http', '$window', '$mdToast', function ($scope, $http, $window, $mdToast) {
    $scope.updateTask = function(){
        var data = {
            idtodos: 1, //Todo: richtige id holen
            idtodo_tasks: 1, //Todo: richtige id holen
            task: $scope.todo.task,
            isdone: 0
        };
        $http.put('todoAPI/updateTask', data).then(function successCallback(response) {
            $window.location = "taskUI";
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
            idtodos: 1, //Todo: richtige id holen
            idtodo_tasks: 1 //Todo: richtige id holen
        };
        $http.put('todoAPI/deleteSpecificTask', data).then(function successCallback(response) {
            $window.location = "taskUI";
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't update Task. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);