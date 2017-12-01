'use strict'
angular.module('veegam-trials').directive('unique', ['httpservice', 'apiUrl', 'utilsService', function (httpservice, apiUrl, utilsService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            element.on('blur', function () {
                if (ctrl.$viewValue !== '') {

                    var dataUrl = apiUrl + attrs.url.replace('{' + attrs.name + '}', ctrl.$viewValue);
                    var verb = 'get';
                    
                    httpservice[verb](dataUrl).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.message) {
                                switch (response.data.errorCode) {
                                    case 'signup_emailvalidation':
                                    case 'signup_usernamevalidation':
                                        ctrl.$setValidity('uniqueValidation', false);
                                        ctrl.$setValidity('invalidDomainValidation', true);
                                        break;
                                    case 'signup_invaliddomain':
                                    ctrl.$setValidity('invalidDomainValidation', false);
                                    ctrl.$setValidity('uniqueValidation', true);
                                    break;
                                }

                            } else {
                                ctrl.$setValidity('uniqueValidation', true);
                                ctrl.$setValidity('invalidDomainValidation', true);
                            }
                            ctrl.$validate();

                        }
                        // }, function (data, status) {
                    }, function (err) {
                        console.log(err)
                    });

                }
            });
        }
    };
}]);