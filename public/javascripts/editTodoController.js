'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("editTodoController", ['$scope', '$http', '$window', '$mdToast', function ($scope, $http, $window, $mdToast) {
    $scope.updateTodo = function(){
        var data = {
            idtodos: 1,
            topic: $scope.todo.topic,
            description: $scope.todo.description,
            isdone: 0
        };
        $http.put('todoAPI/updateSpecificTodo', data).then(function successCallback(response) {
            $window.location = "taskUI";
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't update Todo. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);
