app.directive('shortenerItem', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/shortener-item/shortener-item.html',
        scope: {
            sid: '@'
        },
        controller: function($scope, $rootScope, shortenerService) {
            shortenerService.getByID($scope.sid).then(function(success) {
                $scope.shortener = success.data;
                $scope.shortener.result = window.location.hostname + window.location.pathname + $scope.shortener.slug;
            }, function(error) {
                console.log(error);
            });
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
                    Cookies.set('shorteners', arr_shorteners.join());
                    $rootScope.shorteners = shortenerService.get();
                    $rootScope.loading = false;
                }, function(error) {
                    console.log(error);
                });
            };
        }
    }
});