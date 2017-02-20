app.service('visitorService', function(apiService) {
    return {
        getTopLocation: function(ids) {
            return apiService.getBy(API_URL + 'get-top-location/', ids);
        },
        getTopReferrer: function(ids) {
            return apiService.getBy(API_URL + 'get-top-referrer/', ids);
        },
        getClicksByDate: function(id, from_date, to_date) {
            return apiService.getBy(API_URL + 'get-clicks-by-date/', id + '/' + from_date + '/' + to_date);
        },
        getClicksByReferrer: function(id, from_date, to_date) {
            return apiService.getBy(API_URL + 'get-clicks-by-referrer/', id + '/' + from_date + '/' + to_date);
        },
        getClicksByLocation: function(id, from_date, to_date) {
            return apiService.getBy(API_URL + 'get-clicks-by-location/', id + '/' + from_date + '/' + to_date);
        },
        getCountClickByDate: function(id, from_date, to_date) {
            return apiService.getBy(API_URL + 'get-count-click-by-date/', id + '/' + from_date + '/' + to_date);
        }
    }
});