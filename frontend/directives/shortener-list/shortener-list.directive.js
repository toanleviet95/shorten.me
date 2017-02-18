app.directive('shortenerList', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-list/shortener-list.html',
        controller: function($rootScope, shortenerService) {
            $rootScope.loading = true;
            var shorteners = Cookies.get('shorteners');
            if (shorteners) {
                shorteners = '[' + shorteners + ']';
                shortenerService.get(shorteners).then(function(success) {
                    $rootScope.shorteners = success.data;
                    $rootScope.loading = false;
                }, function(error) {
                    console.log(error);
                });
            }else{
                $rootScope.loading = false;
            }
        }
    }
});