app.directive('headerAnalytic', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/header-analytic/header-analytic.html',
        controller: function($scope, $routeParams) {
            $scope.title = $routeParams.slug;
        }
    }
});