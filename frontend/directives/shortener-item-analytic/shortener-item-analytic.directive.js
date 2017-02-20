app.directive('shortenerItemAnalytic', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-item-analytic/shortener-item-analytic.html',
        scope: {
            shortener: '=item'
        },
        controller: function($scope, shortenerService) {
            if ($scope.shortener.given_url.length > 40) {
                $scope.shortener.url_output = $scope.shortener.given_url.substring(0, 39) + '...';
            } else {
                $scope.shortener.url_output = $scope.shortener.given_url;
            }
            $scope.shortener.result = '/' + $scope.shortener.slug;
        }
    }
});