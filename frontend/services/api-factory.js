app.factory('apiService', function($http) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + TOKEN;
    return {
        get: function(url) {
            return $http.get(url);
        },
        getByID: function(url, id) {
            return $http.get(url + id);
        },
        post: function(url, obj) {
            return $http.post(url, obj);
        },
        put: function(url, obj) {
            return $http.put(url, obj);
        },
        delete: function(url, id) {
            return $http.delete(url + id);
        }
    }
});