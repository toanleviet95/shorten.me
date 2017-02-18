// Config routes for application

var app = angular.module('shorten_me_app', ['ngRoute', 'ngNotify', 'angular.morris']);

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
        controller: 'analytic_ctrl',
        css: [
            '//fonts.googleapis.com/css?family=Roboto:300,400,500,700',
            '//fonts.googleapis.com/icon?family=Material+Icons',
            'frontend/public/css/main.css',
            'frontend/public/css/global.css',
            'frontend/public/css/colors.css',
            'frontend/public/css/box-shadows.css',
            'frontend/public/css/animate.css',
            'frontend/public/css/layouts/top-navigation-1.css',
            'frontend/public/css/elements/navbar-2.css',
            'frontend/public/css/elements/jumbotron-2.css',
            'frontend/public/css/dashboards/analytics.css',
            'frontend/bower_components/morris.js/morris.css',
            'frontend/public/css/user-widgets/user-widget-1.css',
            'frontend/public/css/user-widgets/user-widget-10.css',
            'frontend/public/css/user-widgets/user-widget-11.css',
            'frontend/public/css/user-widgets/user-widget-2.css',
            'frontend/public/css/user-widgets/user-widget-6.css',
            'frontend/public/css/user-widgets/user-widget-7.css',
            'frontend/public/css/user-widgets/user-widget-8.css',
            'frontend/public/css/user-widgets/user-widget-9.css',
            'frontend/public/css/text-widgets/text-widget-1.css',
            'frontend/public/css/text-widgets/text-widget-2.css',
            'frontend/public/css/text-widgets/text-widget-7.css'
        ]
    })
}]);