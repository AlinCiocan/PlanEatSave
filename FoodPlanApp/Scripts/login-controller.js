/// <reference path="angular.js" />

(function(angular) {
    "use strict";

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    // TODO: make sure to refactor this controller, it starts to become too big
    foodplanBoardApp.controller("LoginController",
        ["$scope", "$http", function($scope, $http) {

            $scope.login = function() {

            };

        }]);

})(window.angular);