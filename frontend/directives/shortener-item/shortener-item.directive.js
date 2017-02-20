app.directive('shortenerItem', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-item/shortener-item.html',
        scope: {
            shortener: '=item'
        },
        controller: function($scope, $rootScope, shortenerService) {
            $scope.shortener.result = window.location.hostname + window.location.pathname + $scope.shortener.slug;
            $scope.analytic = function(slug) {
                window.location.href = './analytics/' + slug;
            };
            $scope.del_shorten = function(id) {
                $rootScope.loading = true;
                shortenerService.delete(id).then(function(success) {
                    var shorteners = Cookies.get('shorteners');
                    if (shorteners) {
                        var arr_shorteners = shorteners.split(',');
                        var result = [];
                        for (var index in arr_shorteners) {
                            if (arr_shorteners[index] == id) {
                                arr_shorteners.splice(index, 1);
                            }
                        }
                    }
                    Cookies.set('shorteners', arr_shorteners.join(), { expires: 365 });
                    var shorteners = Cookies.get('shorteners');
                    shorteners = '[' + shorteners + ']';
                    shortenerService.get(shorteners).then(function(success) {
                        $rootScope.shorteners = success.data;
                        $rootScope.loading = false;
                    }, function(error) {
                        console.log(error);
                        $rootScope.loading = false;
                    });
                }, function(error) {
                    console.log(error);
                    $rootScope.loading = false;
                });
            };
        }
    }
});