(function () {
    angular
        .module('app.twitch')
        .factory('twitchService', twitchService);

    /* @ngInject */
    twitchService.$inject = ['$http', 'ApiUrls'];

    function twitchService($http, ApiUrls) {

        var api = {
            getStream: getStream,
            getChannel: getChannel
        }
        return api;

        /// Implementation ///
        function getStream(stream) {
            var cb = '?callback=JSON_CALLBACK';

            return $http.jsonp(ApiUrls.streams + stream + cb)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        function getChannel(channel) {
            var cb = '?callback=JSON_CALLBACK';

            return $http.jsonp(ApiUrls.channels + channel + cb)
                .success(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
        }
    }
})();