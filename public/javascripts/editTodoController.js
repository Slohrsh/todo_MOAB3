'use strict';
var todoApp = angular.module("todo");

todoApp.controller("editTodoController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTodoID',
    'exchangeSessionKey',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeTodoID,
        exchangeSessionKey
    ) {

    var id = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();
    $scope.updateTodo = function(){
        var data = {
            sessionkey : sessionKey,
            idtodos: id,
            topic: $scope.todo.topic,
            description: $scope.todo.description,
            isdone: 0
        };
        $http.put('todoAPI/updateSpecificTodo', data).then(function successCallback(response) {
            $location.path("/taskUI");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't update Todo. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);
