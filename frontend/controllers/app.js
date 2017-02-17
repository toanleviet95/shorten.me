// Config routes for application

var app = angular.module('shorten_me_app', ['ngRoute', 'ngNotify']);

app.directive('head', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        return {
            restrict: 'E',
            link: function(scope, elem) {
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function(e, next, current) {
                    if (current && current.$$route && current.$$route.css) {
                        if (!angular.isArray(current.$$route.css)) {
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet) {
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if (next && next.$$route && next.$$route.css) {
                        if (!angular.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet) {
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.when('/', {
        templateUrl: 'frontend/pages/home.html',
        css: ['frontend/public/css/style.css', '//fonts.googleapis.com/css?family=Text+Me+One']
    }).when('/analytics/:slug', {
        templateUrl: 'frontend/pages/analytic.html',
        controller: 'analytic_ctrl'
    })
}]);