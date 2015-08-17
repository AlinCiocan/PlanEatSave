/// <reference path="angular.js" />

(function (angular) {
    "use strict";

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    foodplanBoardApp.controller("BoardController", ["$scope", "$http", function ($scope, $http) {
        $http.get("/api/board/5")
        .then(function(response) {
            console.log("success", response);
            $scope.board = response.data;
        }, function(error) {
            console.log("error", error);
        });

        $scope.boardDay = "Happy Friday";
    }]);

})(window.angular);