/// <reference path="angular.js" />
/// <reference path="underscore.js" />
(function(angular) {
    "use strict";

    var BOARD_ID = 1;

    var getBoardApiUrl = function(boardId) {
        var BOARD_API_URL = "/api/board/";

        return BOARD_API_URL + boardId;
    };
    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    // TODO: make sure to refactor this controller, it starts to become too big
    foodplanBoardApp.controller("BoardController", [
        "$scope", "$http", "$window", function($scope, $http, $window) {
            $http.get(getBoardApiUrl(BOARD_ID))
                .then(function(response) {
                    console.log("success", response);
                    $scope.board = response.data;


                    $scope.updateStyleForBoard = function() {
                        $scope.styleForBoard = {
                            width: ($scope.board.days.length + 1) * 220 + "px"
                        };
                    };

                    $scope.updateStyleForBoard();
                    watchBoard();


                    var unwatchBoard;
                    function watchBoard() {
                        unwatchBoard = $scope.$watch("board", function (newBoard, oldBoard) {
                            /*This is a special case for the first time when receiving the board
                from the server and from $watch will detect this a change, but both the
                new and old board are identical*/
                            if (newBoard === oldBoard) {
                                return;
                            }

                            $http.put(getBoardApiUrl(newBoard.id), newBoard)
                                .then(function(rsp) {
                                    console.log("response from put request", rsp);
                                    $scope.board = rsp.data;

                                    $scope.updateStyleForBoard();
                                    unwatchBoard();
                                    watchBoard();
                                });
                        }, true);
                    }


                    $scope.clearBoard = function () {

                        $http.delete(getBoardApiUrl($scope.board.id))
                             .success(function () {
                                 $window.location.reload();
                            })
                             .error(function (err) {
                                 alert("An error ocurred with the clear of the board");
                                 console.log(err);
                             });

                    };
                    


                    $scope.addCategory = function(dayId) {
                        var newCategoryTitle = prompt("New category name", "");
                        if (!newCategoryTitle) {
                            alert("Unfortunatelly, you cannot add an empty category");
                            return;
                        }


                        var day = getDayById(dayId);

                        day.categories.push({
                            dayId: dayId,
                            title: newCategoryTitle
                        });
                    };

                    $scope.addItem = function(category) {
                        var newItemTitle = prompt("New item name", "");
                        if (!newItemTitle) {
                            alert("Unfortunatelly, you cannot add an empty item");
                            return;
                        }


                        category.items.push({
                            categoryId: category.id,
                            title : newItemTitle
                        });

                    };

                    $scope.addDay = function () {
                        var newDay = thereAreAnyOtherDays() ? addOneDay(mostRecentDay()) : today();

                        $scope.board.days.push({
                            boardId: $scope.board.id,
                            date: newDay
                        });


                        function thereAreAnyOtherDays() {
                            return $scope.board.days.length !== 0;
                        }

                        function addOneDay(date) {
                            var copyOfDate = new Date(date);

                            copyOfDate.setDate(copyOfDate.getDate() + 1);

                            return copyOfDate;
                        }



                        function today() {
                            return new Date();
                        }

                        function mostRecentDay() {
                            var day = $scope.board.days[$scope.board.days.length - 1];
                            return day.date;
                        }
                    };

                    function getDayById(dayId) {
                        return _.findWhere($scope.board.days, { id: dayId });
                    }

                    function getCategoryById(categories, categoryId) {
                        return _.findWhere(categories, { id: categoryId });
                    }


                }, function(error) {
                    console.log("error", error);
                });

        }
    ]);

})(window.angular);