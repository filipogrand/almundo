(function() {
    'use strict';

    angular
        .module('app')
        .factory('RequestService', RequestService);

    RequestService.$inject = ['$log', '$http', 'EnvironmentConfig', 'SessionService'];

    /* @ngInject */
    function RequestService($log, $http, EnvironmentConfig, SessionService) {
        var headers = {};
        if (SessionService.get('sessionData')) {
            $http.defaults.headers.common['Authorization'] = SessionService.get('sessionData').accessToken;
        }

        var url = EnvironmentConfig.API_URL;

        var service = {
            postData: postData,
            putData: putData,
            deleteData: deleteData,
            getData: getData
        };
        return service;

        function postData(endpoint, data) {
            return $http
                .post(url + endpoint, data)
                .then(function(res) {
                    return res;
                });
        }

        function putData(endpoint, data) {
            return $http
                .put(url + endpoint, data)
                .then(function(res) {
                    return res;
                });
        }

        function deleteData(endpoint) {
            return $http
                .delete(url + endpoint)
                .then(function(res) {
                    return res;
                });
        }

        function getData(endpoint, params) {
            return $http
                .get(url + endpoint, {
                    params: params
                })
                .then(function(res) {
                    return res;
                });
        }
    }
})();