'use strict';
var todoApp = angular.module("todo");

todoApp.controller("newTodoController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeSessionKey',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeSessionKey) {

    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        $scope.goBack = function () {
            $location.path("/todoUI");
        }

        $scope.newTodo = function(){
            var data = {
                sessionKey: sessionKey,
                topic: $scope.todo.topic,
                description: $scope.todo.description,
                isdone: 0
            };
            $http.post('todoAPI/newSpecificTodo', data).then(function successCallback(response) {
                $location.path("/todoUI");
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Can't create Todo. Please try it later")
                        .hideDelay(3000)
                );
            });
        };
    }
}]);