app.controller('analytic_ctrl', function($scope, $routeParams, shortenerService) {
    var shorteners = shortenerService.get();
    var flag = false;
    for (var index in shorteners) {
        if(shorteners[index].slug == $routeParams.slug){
            flag = true;
            break;
        }
    }
    if(flag == false){
        window.location.href = './'
    }
});