app.service('shortenerService', function(apiService) {
    return {
        get: function() {
            var shorteners = Cookies.get('shorteners');
            if (shorteners) {
                var arr_shorteners = shorteners.split(',');
                var result = [];
                function callAjax(url, id) {
                        var result="";
                        $.ajax({
                        url:url+id,
                        async: false,
                        method: 'GET',
                        beforeSend: function(xhr, settings) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + TOKEN);
                        },
                        success:function(data) {
                            result = data; 
                        }
                    });
                    return result;
                }
                for (var index in arr_shorteners) {
                    result.push(callAjax(API_URL + 'shorteners/', arr_shorteners[index]))
                }
                return result;
            } else {
                return null;
            }
        },
        getByID: function(id) {
            return apiService.getByID(API_URL + 'shorteners/', id);
        },
        post: function(shortener) {
            return apiService.post(API_URL + 'shorteners', shortener);
        },
        delete: function(id) {
            return apiService.delete(API_URL + 'shorteners/', id);
        }
    }
});