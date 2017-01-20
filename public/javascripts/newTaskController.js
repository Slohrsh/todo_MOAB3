'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("newTaskController", ['$scope', '$http', '$window', '$mdToast', function ($scope, $http, $window, $mdToast) {
    $scope.newTodo = function(){
        var data = {
            idtodo: 1, //Todo: richtige id holen
            task: $scope.todo.task,
            isdone: 0
        };
        $http.post('todoAPI/newTask', data).then(function successCallback(response) {
            $window.location = "taskUI";
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't create Task. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);