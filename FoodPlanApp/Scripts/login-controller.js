/// <reference path="angular.js" />

(function(angular) {
    "use strict";

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    foodplanBoardApp.controller("LoginController",
        ["$scope", "$http", "$window", function ($scope, $http, $window) {


            function loginRequestCallback(response) {
                console.log(response.data);
                $window.location.href = "/board";
            }

            function loginRequestFailedCallback(error) {
                console.log("An error ocurred while trying to do login", error);
                alert("Username or password is incorrect, please try again.");
            }


            $scope.login = function () {
                var user = {
                    username: $scope.username,
                    password: $scope.password
                };
                $http.post("/api/user/login", user)
                    .then(loginRequestCallback, loginRequestFailedCallback);
            };


        }]);

})(window.angular);