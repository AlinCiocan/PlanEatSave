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
        "$scope", "$http", function($scope, $http) {
            $http.get(getBoardApiUrl(BOARD_ID))
                .then(function(response) {
                    console.log("success", response);
                    $scope.board = response.data;

                    $scope.styleForBoard = {
                        width: $scope.board.days.length * 220 + "px"
                    };


                    watchBoard();


                    function watchBoard() {
                        var unwatchBoard = $scope.$watch("board", function(newBoard, oldBoard) {
                            /*This is a special case for the first time when receiving the board
                from the server and from $watch will detect this a change, but both the
                new and old board are identical*/
                            debugger;
                            if (newBoard === oldBoard) {
                                return;
                            }

                            $http.put(getBoardApiUrl(newBoard.id), newBoard)
                                .then(function(rsp) {
                                    console.log("response from put request", rsp);
                                    $scope.board = rsp.data;
                                    unwatchBoard();
                                    watchBoard();
                                });
                        }, true);
                    }

                    $scope.changeBoard = function() {
                        $scope.board.title = "my great board 2";

                        $scope.board.days[0].categories[0].title = "some great category here";
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