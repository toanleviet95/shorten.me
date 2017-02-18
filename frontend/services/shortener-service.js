app.service('shortenerService', function(apiService) {
    return {
        get: function(ids) {
            return apiService.getBy(API_URL + 'get-shorteners/', ids);
        },
        getByID: function(id) {
            return apiService.getBy(API_URL + 'shorteners/', id);
        },
        getTotalClicks: function(ids){
            return apiService.getBy(API_URL + 'get-total-clicks/', ids);
        },
        post: function(shortener) {
            return apiService.post(API_URL + 'shorteners', shortener);
        },
        delete: function(id) {
            return apiService.delete(API_URL + 'shorteners/', id);
        }
    }
});