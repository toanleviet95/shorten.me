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
        }
    }
});