(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('notificationSvc', notificationSvc);

    notificationSvc.$inject = ['httpservice', 'apiUrl', 'utilsService'];

    function notificationSvc(httpservice, apiUrl, utilsService) {
        var self = this;

        self.email = function(data) {
            var apiUrlPrivate = apiUrl + '/labs-service/org/' + utilsService.getOrganization() + '/notification';
            return httpservice.post(apiUrlPrivate, data, true);
        }

        self.publicEmail = function(data) {
            var apiUrlPublic = apiUrl + '/public/labs/notification';
            return httpservice.post(apiUrlPublic, data, false, null, 'public');
        }

        return self;
    }
})();