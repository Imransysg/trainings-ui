(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('eulaSvc', eulaSvc);

    eulaSvc.$inject = ['httpservice', 'apiUrl', 'utilsService'];

    function eulaSvc(httpservice, apiUrl, utilsService) {
        var self = this;

        apiUrl = apiUrl + "/eula-service";
        // var userType = utilsService.getUserType();

        self.getEulaByType = function(type) {
            var url = apiUrl + '/type/' + type + '/eula';
            return httpservice.get(url, false);
        }

        self.findEulaByVersion = function(type, eulaVersion) {
            var url = apiUrl + '/type/' + type + '/eula/' + eulaVersion + '/';
            return httpservice.get(url, false);
        }

        return self;
    }
})();