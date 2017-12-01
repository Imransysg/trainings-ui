(function () {
    'use strict';

    angular.module('veegam-trials').component('signup', {
        controller: SignUpController,
        controllerAs: 'vm',
        templateUrl: 'app/components/signup/signup.view.html',
    });

    /** @ngInject */
    SignUpController.$inject = ['$scope', '$state', '$mdDialog', '$mdToast', 'RECAPTCHA_KEY', '$timeout', 'signupService', 'publisherDetails', 'errorSvc', 'eulaSvc'];

    function SignUpController($scope, $state, $mdDialog, $mdToast, RECAPTCHA_KEY, $timeout, signupService, publisherDetails, errorSvc, eulaSvc) {

        var vm = this;

        vm.publisher = angular.copy(publisherDetails.publisherModel);

        vm.recaptchaKey = RECAPTCHA_KEY; //'6Lf_rCgUAAAAAI-AhD5LWrs_I7I0Sz7Ku-dC3Y2A';
        vm.requestAccess = ['Demo Labs'];
        vm.formSuccess = false;
        vm.showLoading = false;

        //get latest publisher License Agreement (EULA) with version
        eulaSvc.getEulaByType('publisher').then(function (result) {
            vm.latestEulaData = result.data;
            vm.publisher.eula_version = result.data.eulaVersion || '0.0';
        }, function (error) {
            console.log(error);
        });

        // Function execute to register the user

        vm.userRegistration = function () {
            vm.showLoading = true;
            signupService.createUser(vm.publisher).then(function (response) {
                if (response) {
                    console.log("Completed Registration Successfully");
                    //alert("Completed Registration Successfully");
                    vm.formSuccess = true;
                    vm.showLoading = false;
                    $state.go('login');
                }
            }, function (error) {
                vm.showLoading = false;
                console.log(error);
                if (error.status == 401 && error.data) {
                    errorSvc.displayErrorString(error.data.errorCode, 'error', 5, error.data.message);
                }
                else {
                    errorSvc.displayErrorString('signup-service_1', 'error', 5, error.message);
                }
                errorSvc.logProcessing(error, 'error');
            });
        }

        // Function execute to route the user to login page
        vm.moveToLogin = function () {
            $state.go('login');
        }

        vm.showConfirm = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure to cancel the registration ?')
                .targetEvent(ev)
                .ok("Yes, I'm sure")
                .cancel('Go Back');

            var toast = $mdToast.simple()
                .textContent('Reset form')
                .highlightClass('md-accent')
                .position('bottom');

            $mdDialog.show(confirm).then(function () {
                $scope.signupForm.$setPristine();
                $scope.signupForm.$setUntouched();
                vm.publisher = angular.copy(publisherDetails.publisherModel);
                $mdToast.show(toast);
            }, function (error) {
                console.log(error);
            });
        };
        vm.checkPassword = function () {
            if (vm.publisher.password === vm.confirmPassword) {
                delete $scope.signupForm.confirmPassword.$error['pattern'];
                $scope.signupForm.confirmPassword.$valid = true;
                $scope.signupForm.confirmPassword.$invalid = false;
                $scope.$apply();
            }
            $scope.signupForm.confirmPassword.$error.pattern = true;
            $scope.signupForm.confirmPassword.$valid = false;
            $scope.signupForm.confirmPassword.$invalid = true;
        }

    }
})();