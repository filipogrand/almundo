(function() {
    'use strict';

    angular
        .module('app')
        .service('SessionService', SessionService);

    SessionService.$inject = [];

    /* @ngInject */
    function SessionService() {
        this.prefix = '';
        this.get = getSession;
        this.set = setSession;
        this.unset = unsetSession;
        this.unsetAll = unsetAllSessions;

        function getSession(key) {
            var item = sessionStorage.getItem(this.prefix + key) || localStorage.getItem(this.prefix + key);
            // angular.toJson will convert null to 'null', so a proper conversion is needed
            // FIXME not a perfect solution, since a valid 'null' string can't be stored
            if (!item || item === 'null') {
                return null;
            }
            if (item.charAt(0) === '{' || item.charAt(0) === '[') {
                return angular.fromJson(item);
            }
            return item;
        }

        function setSession(key, value, permanent) {
            if (angular.isObject(value) || angular.isArray(value)) {
                value = angular.toJson(value);
            }
            if (permanent) {
                localStorage.setItem(this.prefix + key, value);
            }
            return sessionStorage.setItem(this.prefix + key, value);
        }

        function unsetSession(key) {
            localStorage.removeItem(this.prefix + key);
            return sessionStorage.removeItem(this.prefix + key);
        }

        function unsetAllSessions() {
            localStorage.clear();
            return sessionStorage.clear();
        }
    }
})();