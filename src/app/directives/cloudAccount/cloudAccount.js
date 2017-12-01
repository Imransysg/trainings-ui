(function() {
    'use strict';

    angular.module('veegam-trials').directive('cloudAccount', function() {
        return {
            restrict: 'AE',
            templateUrl: 'app/directives/cloudAccount/cloudAccount.view.html',
            scope: {
                cloudAcc: "=cloudAcc",
                cloudProvider: "=cloudProvider"
            },
            controller: function($scope, $rootScope, createTrialService, providers, providerSvc, errorSvc) {

                //create instance of providerForOrg from providers model
                $scope.providerForOrg = angular.copy(providers.providerForOrg);
                //create instance of providerDetails from providers model
                $scope.providerDetails = angular.copy(providers.providerDetails);
                //to store all providers
                $scope.providerArray = [];
                //flag to show/hide spinner when all cloud providers are being loaded
                $scope.showCloudLoading = true;

                //Get all providers based on Org ID
                providerSvc.getProvidersByOrgID().then(function(response) {
                    if (response) {
                        $scope.providerArray = response.data;
                        $scope.showCloudLoading = false;
                    }
                }, function(error) {
                    $scope.showCloudLoading = false;
                    console.log(error);
                    errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                    errorSvc.logProcessing(error, 'error');
                });

                //to set flag for validation of cloud provider tab in demo lab creation modal
                if ($scope.cloudAcc.currentPage === 3) {
                    if ($scope.cloudProvider.provider_account_id) {
                        createTrialService.setCloudAccountValidate(true);
                    } else {
                        createTrialService.setCloudAccountValidate(false);
                    }
                }

                //to save new cloud provider
                $scope.saveCloudAccount = function() {
                    $scope.providerDetails.providerType = "oracle";
                    $scope.providerDetails.private_Key_Path = btoa($scope.providerDetails.private_Key_Path);
                    $scope.providerForOrg.provider_details = $scope.providerDetails;
                    $scope.showCloudLoading = true;
                    providerSvc.createProviderByOrg($scope.providerForOrg).then(function(response) {
                        if (response) {
                            $scope.cloudAcc.selectedAccount.provider_account_id = response.data.id;
                            $scope.cloudProvider.provider_account_id = response.data.id;
                            $scope.cloudProvider.type = "oracle";
                            // push in providerArray. Need to check what we gar in response????
                            providerSvc.getProvidersByOrgID().then(function(res) {
                                if (res) {
                                    $scope.providerArray = res.data;
                                    $scope.showCloudLoading = false;
                                }

                            }, function(error) {
                                $scope.showCloudLoading = false;
                                console.log(error);
                                errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                                errorSvc.logProcessing(error, 'error');
                            });

                            //clean scope variable
                            $scope.providerDetails = angular.copy(providers.providerDetails);

                            if ($scope.cloudAccountForm) {
                                $scope.cloudAccountForm.$setPristine(true);
                                $scope.cloudAccountForm.$setUntouched();
                            }
                            if ($scope.cloudProvider.provider_account_id) {
                                createTrialService.setCloudAccountValidate(true);
                            } else {
                                createTrialService.setCloudAccountValidate(false);
                            }
                        }
                    }, function(error) {
                        $scope.showCloudLoading = false;
                        if ($scope.cloudProvider.provider_account_id) {
                            createTrialService.setCloudAccountValidate(true);
                        } else {
                            createTrialService.setCloudAccountValidate(false);
                        }
                        if (error.status == 401 && error.data) {
                            errorSvc.displayErrorString('labs-service_7', 'error', 5);
                        } else {
                            console.log(error);
                            errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                        }
                        errorSvc.logProcessing(error, 'error');
                    });
                }

                //to show form to create new cloud account provider
                $scope.showCloudAccountFormFn = function() {
                    $scope.cloudAcc.showCloudAccountForm = true;
                }

                //to hide form to create new cloud account provider
                $scope.hideCloudAccountFormFn = function() {
                    $scope.cloudAcc.showCloudAccountForm = false;
                    $scope.providerDetails = angular.copy(providers.providerDetails);
                    if ($scope.cloudAccountForm) {
                        $scope.cloudAccountForm.$setPristine(true);
                        $scope.cloudAccountForm.$setUntouched();

                    }
                }

                //to set selected cloud provider
                $scope.selectCloudAccount = function(item) {
                    $scope.cloudProvider.provider_account_id = item.provider_id;
                    $scope.cloudProvider.type = "oracle";
                    createTrialService.setCloudAccountValidate(true);
                }

                //to show help section for cloud provider
                $scope.helpSection = function(value) {
                    $rootScope.$broadcast('helpSection', value);
                }
            }
        };
    })
})();