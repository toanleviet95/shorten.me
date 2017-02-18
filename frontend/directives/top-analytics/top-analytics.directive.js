app.directive('topAnalytics', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/top-analytics/top-analytics.html',
        controller: function($scope, shortenerService, visitorService) {
            var shorteners = Cookies.get('shorteners');
            if (shorteners) {
                shorteners = '[' + shorteners + ']';
                shortenerService.getTotalClicks(shorteners).then(function(success) {
                    $scope.total_clicks = success.data.total_clicks;
                }, function(error) {
                    console.log(error);
                });
                visitorService.getTopLocation(shorteners).then(function(success) {
                    $scope.top_location = success.data;
                }, function(error) {
                    console.log(error);
                });
                visitorService.getTopReferrer(shorteners).then(function(success) {
                    $scope.top_referrer = success.data;
                }, function(error) {
                    console.log(error);
                });
            }

        }
    }
});