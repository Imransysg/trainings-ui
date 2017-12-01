(function() {
    'use strict';

    angular.module('veegam-trials').component('login', {
        controller: LoginController,
        controllerAs: 'vm',
        templateUrl: 'app/components/login/login.view.html',
    });

    /** @ngInject */
    LoginController.$inject = ['$rootScope', '$state', 'auth0Service', 'toastr', 'utilsService', 'errorSvc', '$window', 'eulaSvc'];

    function LoginController($rootScope, $state, auth0Service, toastr, utilsService, errorSvc, $window, eulaSvc) {
        var vm = this;
        $.base64.utf8encode = true;
        vm.user = {};
        vm.showLoading = false;
        // vm.loginresponse = {};
        // toastr.info('<input type="checkbox" checked> Success!', 'With HTML', {
        //     allowHtml: true
        // });

        // Function execute to authenticate the user using Auth0
        vm.login = function() {
            vm.showLoading = true;
            auth0Service.login(vm.user.email, vm.user.password)
                .then(function(response) {
                    errorSvc.logProcessing(response, 'log');
                    var payload = response.idToken.split('.')[1];
                    var result = $.base64.atob(payload, true);
                    localStorage.setItem("payload", result)
                    localStorage.setItem("idToken", response.tokenType + " " + response.idToken);
                    vm.showLoading = false;
                    // if ($state.params.callBackState && $state.params.callBackState != '') {
                    //     $window.location.href = $state.params.callBackState;
                    // } else {
                    //     $state.go('trainings');
                    // }
                    $state.go('trainings');

                }, function(error) {
                    vm.showLoading = false;
                    // alert('Login error !!!');
                    if (error.statusCode == 403) {
                        errorSvc.displayErrorString('login-service_1', 'error', 5);
                    }
                    errorSvc.logProcessing(error, 'error');

                    if (error.description.errorCode) {
                        switch (error.description.errorCode) {
                            case 'auth0_eula_agreement_invalid_version':
                            case 'auth0_eula_agreement_eula_not_exists':
                                $rootScope.userEmailId = vm.user.email;
                                $state.go('termsService', { t: error.description.userType, a: 'true' });
                                break;
                            case 'signin_emailnotverified':
                                errorSvc.displayErrorString('signin_emailnotverified', 'error', 5, error.description.message);
                                break;
                            default:
                                errorSvc.displayErrorString(error.description.errorCode, 'error', 5, error.description.message);
                                break;
                        }
                    }


                });
        }

        // Function execute to move  Publisher signup page
        vm.moveToSignup = function() {
            $state.go('signup');
        }

        vm.$onInit = function() {
            // var publicPath = $state.$current.name == 'demoLab.publicPreview' ? true : false;
            // if (!publicPath) {
            //     if (utilsService.getUserId()) {
            //         $state.go('trainings');
            //     }
            // }
            if (utilsService.getUserId()) {
                $state.go('trainings');
            }

        }

        vm.moveToForgot = function() {
            $state.go('forgotpassword');
        }
    }

})();