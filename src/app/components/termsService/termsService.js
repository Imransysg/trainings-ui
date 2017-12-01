(function () {
    'use strict';

    angular.module('veegam-trials').component('termsService', {
        controller: termsServiceController,
        controllerAs: 'vm',
        templateUrl: 'app/components/termsService/termsService.view.html',
    });

    /** @ngInject */
    termsServiceController.$inject = ['$rootScope', '$scope', '$sce', '$state', '$stateParams', 'auth0Service', 'base64', 'errorSvc', 'eulaSvc', 'signupService', 'utilsService', '$mdDialog'];

    function termsServiceController($rootScope, $scope, $sce, $state, $stateParams, auth0Service, base64, errorSvc, eulaSvc, signupService, utilsService, $mdDialog) {
        var vm = this;
        var publicUser = JSON.parse(localStorage.getItem("publicUserDetail"));
        if (publicUser) {
            vm.userType = publicUser.type;
            vm.parentUrl = publicUser.parentUrl;
            vm.userEmail = publicUser.email;
        } else {
            vm.userType = $stateParams.t;
            vm.parentUrl = $stateParams.a;
        }

        vm.latestEulaData = '';


        /** get the EULA data by user type */
        vm.showLoading = true;
        eulaSvc.getEulaByType(vm.userType).then(function (result) {
            if (result.data) {
                vm.latestEulaData = result.data;
                vm.eulaText = vm.trustHTML(vm.latestEulaData.eulaText);
                vm.showLoading = false;
                errorSvc.logProcessing(result, 'log');
            }
            else {
                vm.parentUrl = false;
                vm.showLoading = false;
                errorSvc.displayErrorString('eula-service_1', 'error', 5);
            }
        }, function (error) {
            console.log(error);
            vm.showLoading = false;
            vm.parentUrl = false;
            errorSvc.displayErrorString('eula-service_1', 'error', 5, error.message);
            errorSvc.logProcessing(error, 'error');
        });

        /************************ */





        vm.trustHTML = function (text) {
            return $sce.trustAsHtml(base64.decode(text));
        }

        vm.acceptEulaLatest = function () {
            vm.showLoading = true;
            var metadata = {
                "email": $rootScope.userEmailId,
                "updateData": {
                    "app_metadata": {
                        "eula_version": vm.latestEulaData.eulaVersion
                    }
                }
            }
            //update eula version from signup service
            signupService.updateMetadata(metadata).then(function (result) {
                vm.showLoading = false;
                if (publicUser) {
                    localStorage.removeItem("publicUserDetail");
                }
                if (vm.userType === 'publisher' && !publicUser) {
                    $state.go('login');
                } else if (publicUser) {
                    //$rootScope.$broadcast('UserLaunchDemoLab', 'true');
                    //$state.go('demoLab.publicPreview');
                    vm.hide(true);
                }
                errorSvc.logProcessing(result, 'log');
            }, function (error) {
                vm.showLoading = false;
                console.log(error);
                errorSvc.displayErrorString('eula-service_2', 'error', 5, error.message);
                errorSvc.logProcessing(error, 'error');
                //vm.logout();
            })

        }

        vm.hide = function (value) {
            $mdDialog.hide(value);
        };


        vm.decline = function () {
            localStorage.removeItem("idToken");
            localStorage.removeItem('user');
            localStorage.removeItem("payload");
            localStorage.removeItem("publicUserDetail");
            auth0Service.setUserDetails(null);
            if (vm.userType == 'publisher') {
                $state.go('login');
            } else if (vm.userType == 'user') {
                vm.hide('');
            }

        }

        vm.downloadPDF = function () {
            var doc = new jsPDF();
            doc.fromHTML($('.terms-service-cntnt').html(), 5, 5, {
                'width': 170,
                'elementHandlers': specialElementHandlers
            });
            doc.save('sample-file.pdf');
        }

        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return false;
            }
        };

    }
})();