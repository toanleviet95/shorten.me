app.directive('shortenerList', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-list/shortener-list.html',
        controller: function($rootScope, shortenerService) {
            $rootScope.loading = true;
            $rootScope.shorteners = shortenerService.get();
            $rootScope.loading = false;
        }
    }
});