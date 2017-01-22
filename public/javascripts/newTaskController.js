'use strict';
var todoApp = angular.module("todo");

todoApp.controller("newTaskController", [
    'exchangeTodoID',
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeSessionKey',
    function (
        exchangeTodoID,
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeSessionKey) {


    $scope.newTask = function(){
        var id = exchangeTodoID.get();
        var sessionKey = exchangeSessionKey.get();
        var data = {
            sessionkey : sessionKey,
            idtodo: id,
            task: $scope.todo.task,
            isdone: 0
        };
        $http.post('todoAPI/newTask', data).then(function successCallback(response) {
            $location.path("/taskUI");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't create Task. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);