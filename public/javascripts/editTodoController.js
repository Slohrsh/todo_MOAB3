'use strict';
var todoApp = angular.module("todo");

todoApp.controller("editTodoController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTodoID',
    'exchangeSessionKey',
    'exchangeValues',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeTodoID,
        exchangeSessionKey,
        exchangeValues) {

    var id = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        var taskValues = exchangeValues.get();
        $scope.topic = taskValues.topic;
        $scope.description = taskValues.description;

        $scope.goBack = function () {
            $location.path("/taskUI");
        }

        $scope.updateTodo = function(){
            var data = {
                sessionkey : sessionKey,
                idtodos: id,
                topic: $scope.topic,
                description: $scope.description,
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
    }
}]);
