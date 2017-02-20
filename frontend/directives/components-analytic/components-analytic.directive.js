app.directive('componentsAnalytic', function() {
    return {
        restrict: 'E',
        templateUrl: './frontend/directives/components-analytic/components-analytic.html',
        controller: function($scope, $routeParams, shortenerService, visitorService) {
            var ids = Cookies.get('shorteners');
            if (ids) {
                ids = '[' + ids + ']';
                shortenerService.get(ids).then(function(success) {
                        var shorteners = success.data;
                        var flag = false;
                        var shortener_id = null;
                        for (var index in shorteners) {
                            if (shorteners[index].slug == $routeParams.slug) {
                                shortener_id = shorteners[index].id;
                                flag = true;
                                break;
                            }
                        }
                        if (flag == false) {
                            window.location.href = './'
                        } else {
                            $scope.back_home = function() {
                                window.location.href = './'
                            }
                            $scope.update = function() {
                                window.location.reload();
                            }
                            var date_format = function(date) {
                                var d = new Date(date);
                                var month = new Array();
                                month[0] = "JAN";
                                month[1] = "FEB";
                                month[2] = "MAR";
                                month[3] = "APR";
                                month[4] = "MAY";
                                month[5] = "JUN";
                                month[6] = "JUL";
                                month[7] = "AUG";
                                month[8] = "SEP";
                                month[9] = "OCT";
                                month[10] = "NOV";
                                month[11] = "DEC";
                                var m = month[d.getMonth()];
                                var yyyy = d.getFullYear();
                                var dd = d.getDate();
                                return m + ' ' + dd + ', ' + yyyy;
                            }
                            var draw_bar_chart = function(shortener_id, to_date, from_date) {
                                visitorService.getClicksByDate(shortener_id, to_date, from_date).then(function(success) {
                                    var data = success.data;
                                    $scope.no_info = true;
                                    if (success.data.length > 0) {
                                        $scope.no_info = false;
                                        $scope.clickers = [];
                                        for (var index in data) {
                                            var clicker = { y: null, c: null };
                                            clicker.y = date_format(data[index].start_at);
                                            clicker.c = data[index].total_clicks;
                                            $scope.clickers.push(clicker);
                                        }
                                    }
                                }, function(error) {
                                    console.log(error);
                                });
                            }
                            var draw_location_chart = function(shortener_id, to_date, from_date) {
                                visitorService.getClicksByLocation(shortener_id, to_date, from_date).then(function(success) {
                                    var data = success.data;
                                    $scope.no_info = true;
                                    if (success.data.length > 0) {
                                        $scope.no_info = false;
                                        $scope.locations = [];
                                        for (var index in data) {
                                            var location = { label: null, value: null };
                                            location.label = data[index].location;
                                            location.value = Math.round((data[index].total_clicks * 1 * 100) / $scope.count_click);
                                            $scope.locations.push(location);
                                        }
                                    }
                                }, function(error) {
                                    console.log(error);
                                });
                            }
                            var draw_referrer_chart = function(shortener_id, to_date, from_date) {
                                visitorService.getClicksByReferrer(shortener_id, to_date, from_date).then(function(success) {
                                    var data = success.data;
                                    $scope.no_info = true;
                                    if (success.data.length > 0) {
                                        $scope.no_info = false;
                                        $scope.referrers = [];
                                        for (var index in data) {
                                            var referrer = { label: null, value: null };
                                            referrer.label = data[index].referrer;
                                            if (referrer.label == '') {
                                                referrer.label = 'Dark traffic';
                                            }
                                            referrer.value = Math.round((data[index].total_clicks * 1 * 100) / $scope.count_click);
                                            $scope.referrers.push(referrer);
                                        }
                                    }
                                }, function(error) {
                                    console.log(error);
                                });
                            }
                            $scope.date_range = "Last 7 days";
                            $scope.is_today = false;
                            var from_date = moment().format("YYYY-MM-DD");
                            var to_date = moment().subtract(6, 'days').format("YYYY-MM-DD");
                            $scope.from_date = moment().format("MMMM Do YYYY");
                            $scope.to_date = moment().subtract(6, 'days').format("MMMM Do YYYY");
                            visitorService.getCountClickByDate(shortener_id, to_date, from_date).then(function(success) {
                                $scope.loading = true;
                                $scope.no_info = true;
                                $scope.count_click = 0;
                                if (success.data) {
                                    $scope.no_info = false;
                                    $scope.count_click = success.data.count_click;
                                    draw_bar_chart(shortener_id, to_date, from_date);
                                    draw_referrer_chart(shortener_id, to_date, from_date);
                                    draw_location_chart(shortener_id, to_date, from_date);
                                }
                                $scope.loading = false;
                            }, function(error) {
                                $scope.loading = false;
                                console.log(error);
                            });
                            $("#date_range").change(function() {
                                if ($scope.date_range == "Today") {
                                    to_date = from_date;
                                    $scope.is_today = true;
                                    $scope.from_date = moment().format("MMMM Do YYYY");
                                    $scope.to_date = "";
                                } else if ($scope.date_range == "Last 7 days") {
                                    to_date = moment().subtract(6, 'days').format("YYYY-MM-DD");
                                    $scope.is_today = false;
                                    $scope.from_date = moment().format("MMMM Do YYYY");
                                    $scope.to_date = moment().subtract(6, 'days').format("MMMM Do YYYY");
                                } else {
                                    to_date = moment().subtract(27, 'days').format("YYYY-MM-DD");
                                    $scope.is_today = false;
                                    $scope.from_date = moment().format("MMMM Do YYYY");
                                    $scope.to_date = moment().subtract(27, 'days').format("MMMM Do YYYY");
                                }
                                visitorService.getCountClickByDate(shortener_id, to_date, from_date).then(function(success) {
                                    $scope.loading = true;
                                    $scope.no_info = true;
                                    $scope.count_click = 0;
                                    if (success.data) {
                                        $scope.no_info = false;
                                        $scope.count_click = success.data.count_click;
                                        draw_bar_chart(shortener_id, to_date, from_date);
                                        draw_referrer_chart(shortener_id, to_date, from_date);
                                        draw_location_chart(shortener_id, to_date, from_date);
                                    }
                                    $scope.loading = false;
                                }, function(error) {
                                    $scope.loading = false;
                                    console.log(error);
                                });

                            });
                        }
                    },
                    function(error) {
                        console.log(error);
                    });
            }
        }
    }
});