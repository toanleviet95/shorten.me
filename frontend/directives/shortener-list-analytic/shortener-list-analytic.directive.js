app.directive('shortenerListAnalytic', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-list-analytic/shortener-list-analytic.html',
        controller: function($scope, shortenerService) {
            var shorteners = Cookies.get('shorteners');
            if (shorteners) {
                $scope.analytic = function(slug){
                    window.location.href = './analytics/'+slug;
                };
                shorteners = '[' + shorteners + ']';
                shortenerService.get(shorteners).then(function(success) {
                    $scope.shorteners = success.data;
                }, function(error) {
                    console.log(error);
                });
            }
        }
    }
});