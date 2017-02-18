app.directive('urlInput', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/url-input/url-input.html',
        controller: function($scope, $rootScope, shortenerService, ngNotify) {
            $rootScope.loading = true;
            $scope.shorten = function() {
                $rootScope.loading = true;
                if (!$scope.url_input) {
                    ngNotify.set('Unable to shorten that link. It is not a valid url', {
                        type: 'error',
                        position: 'top',
                        duration: 4000
                    });
                    $rootScope.loading = false;
                } else {
                    var shortener = { given_url: $scope.url_input };
                    shortenerService.post(shortener).then(function(success) {
                        if (success.data.status == 'error') {
                            if (success.data.msg == 'exist') {
                                ngNotify.set('Input URL has already been existed', {
                                    type: 'error',
                                    position: 'top',
                                    duration: 4000
                                });
                            } else {
                                ngNotify.set('That is a shorten link', {
                                    type: 'error',
                                    position: 'top',
                                    duration: 4000
                                });
                            }
                            $rootScope.loading = false;
                        } else {
                            var shorteners = Cookies.get('shorteners');
                            if (shorteners) {
                                shorteners = shorteners + ',' + success.data.id;
                                Cookies.set('shorteners', shorteners, { expires: 365 });
                            } else {
                                Cookies.set('shorteners', success.data.id, { expires: 365 });
                            }
                            shorteners = Cookies.get('shorteners');
                            shorteners = '[' + shorteners + ']';
                            shortenerService.get(shorteners).then(function(success) {
                                $rootScope.shorteners = success.data;
                                $scope.url_input = '';
                                $rootScope.loading = false;
                            }, function(error) {
                                console.log(error);
                            });
                        }

                    }, function(error) {
                        if (error.status == 422) {
                            ngNotify.set('Unable to shorten that link. It is not a valid url', {
                                type: 'error',
                                position: 'top',
                                duration: 4000
                            });
                        }
                        console.log(error);
                        $rootScope.loading = false;
                    });
                }
            };
        }
    }
});