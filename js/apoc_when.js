$(document).ready(function() {
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

angular.module('apocWhen', [])
    .controller('ApocController', ['$scope', function($scope) {
        $scope.daysOfWeek = [
            { day: 'Sun', daynum: '0', offset: '' },
            { day: 'Mon', daynum: '1', offset: '' },
            { day: 'Tue', daynum: '2', offset: '' },
            { day: 'Wed', daynum: '3', offset: '' },
            { day: 'Thu', daynum: '4', offset: '' },
            { day: 'Fri', daynum: '5', offset: '' },
            { day: 'Sat', daynum: '6', offset: 'offset-s4' },
        ];

        $scope.modes = {
            normal: {
                directions: "Which day of the week does this date land on?",
                start_date: new Date(2015, 0, 1),
                end_date: new Date(2015, 11, 31),
                gen_date: function() {
                    var mode = $scope.currentMode;
                    var new_date = randomDate(mode["start_date"], mode["end_date"]);

                    return new_date;
                },
                date_string: function() {
                    return $scope.quizDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                },
            },
            doomsday: {
                directions: "What is the doomsday for this year?",
                start_date: new Date(1900, 0, 1),
                end_date: new Date(2015, 0, 1),
                gen_date: function() {
                    var mode = $scope.currentMode;
                    var new_date = randomDate(mode["start_date"], mode["end_date"]);
                    new_date.setMonth(11, 12); // Dec 12th

                    return new_date;
                },
                date_string: function() {
                    return $scope.quizDate.toLocaleDateString('en-US', { year: 'numeric' });
                },
            },
        };

        $scope.currentMode = $scope.modes["normal"];

        $scope.quizDate = $scope.currentMode["gen_date"]();

        $scope.score = { wins: 0, losses: 0, perc: 0 }

        $scope.checkAnswer = function(selected) {
            var success = selected == $scope.quizDate.getDay();
            var score = $scope.score;
            results.textContent = success;

            if (success) {
                score.wins++;
                $scope.quizDate = $scope.currentMode["gen_date"]();
            } else {
                score.losses++;
            }

            score.perc = (score.wins / (score.losses + score.wins)) * 100;
        };

        $scope.setMode = function(mode) {
            $scope.currentMode = $scope.modes[mode];
            $scope.quizDate = $scope.currentMode["gen_date"]();
        };
    }]);
