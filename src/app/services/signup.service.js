
(function () {
    'use strict';
    angular.module('veegam-trials')
        .service('signupService', signupService);

    signupService.$inject = ['httpservice', 'apiUrl'];

    function signupService(httpservice, apiUrl) {
        var self = this;
        apiUrl = apiUrl + "/signup-service";
        //check if username already exists.
        self.isUserNameExist = function (userName) {
            var url = apiUrl + '/user/username/' + userName + '/exists';
            return httpservice.get(url);
        }

        //check if user email already exists.
        self.isUserEmailExist = function (email) {
            var url = apiUrl + '/user/useremail/' + email + '/exists';
            return httpservice.get(url);
        }

        //create new publisher.
        self.createUser = function (publisher) {
            var url = apiUrl + '/signup';
            return httpservice.post(url, publisher);
        }

        self.updateMetadata = function(metadata) {
            var url = apiUrl + '/user';
            return httpservice.put(url, metadata);
        }
        return self;
    }
})();