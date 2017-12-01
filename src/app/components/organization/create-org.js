(function () {
    'use strict';

    angular.module('veegam-trials').component('createOrganization', {
        controller: createOrganizationController,
        controllerAs: 'vm',
        templateUrl: 'app/components/organization/create-org.view.html',
    });

    /** @ngInject */
    createOrganizationController.$inject = ['$scope', 'httpservice', '$state', '$mdDialog', '$mdToast', 'createOrgSvc', 'planSvc','stripe'];

    function createOrganizationController($scope, httpservice, $state, $mdDialog, $mdToast, createOrgSvc, planSvc,stripe) {
        var vm = this;
        vm.zipCodeValid = false;
        vm.orgFormFields = {
            name: '',
            description: '',
            address: '',
            city: '',
            state: '',
            country: '',
            phoneNumber: '',
            zipCode: null
        };
        vm.states = [];
        vm.countries = [];
        vm.selectedTabSignup = 1;
        vm.orgDetail = '';
        vm.choosePlan = '';
        vm.billingDetails = '';
        vm.organisationModel = { plans: '', paymentMethod: "Credit Card" };
        vm.createBtnStateDisabled = true;


        function loadPlanDetails() {
            planSvc.getPlans().then(function (response) {
                vm.plansData=response.data;
                vm.organisationModel.plans=vm.plansData[0].plan.id;
            }, function (err) {
                console.log(err);
            });
        }
        loadPlanDetails();
        // vm.createOrganization = function () {
        //     console.log("Organization Created Successfully");
        //     // alert("Organization Created Successfully");
        //     $state.go('billing');

        // }

        vm.showConfirm = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure to cancel the registration ?')
                .targetEvent(ev)
                .ok("Yes, I'm sure")
                .cancel('Go Back');

            var toast = $mdToast.simple()
                .textContent('Reset form')
                .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
                .position('bottom');

            $mdDialog.show(confirm).then(function () {
                // orgForm.reset();
                $mdToast.show(toast);
            }, function () { });
        };

        vm.getStates = function (country) {
            if (country != -1) {
                vm.orgFormFields.state = -1;
                vm.states = vm.countryData[country];
            }
        }

        vm.getCountries = function () {
            var countries = [];
            httpservice.get('./data/country.json', false)
                .then(function (res) {
                    vm.countryData = res.data;
                    countries = _.map(vm.countryData, function (data, key) {
                        return key;
                    });
                    vm.countries = countries;
                }, function (err) {
                    console.log("Error in fetching data from json" + err);
                });
        }

        vm.getCountries();

        /*Function for toggling tabs */
        vm.changeTabs = function () {
            if (vm.selectedTabSignup != 3) {
                vm.selectedTabSignup += 1;
            } else {
                vm.selectedTabSignup = 1;
            }

            vm.toggleTabs(vm.selectedTabSignup);
        }

        $scope.$watch(function () {
            return vm.organisationModel;
        }, function (newVal, oldVal) {
            if (vm.organisationModel.orgName && vm.organisationModel.orgName !== "") {
                createOrgSvc.setOrganizationDetails(true);
            }
            else if (vm.selectedTabSignup === 1) {
                createOrgSvc.setOrganizationDetails(false);
            }

            if (vm.organisationModel.billingEmailId && vm.organisationModel.billingEmailId !== "" && vm.organisationModel.cardNumber && vm.organisationModel.cardNumber !== "" && vm.organisationModel.cardCvv && vm.organisationModel.cardCvv !== "" && vm.organisationModel.month && vm.organisationModel.month !== "" && vm.organisationModel.year && vm.organisationModel.year !== "") {
                createOrgSvc.setBillingDetails(true);
            }
            else if (vm.selectedTabSignup === 3) {
                createOrgSvc.setBillingDetails(false);
            }
            vm.changeCreateBtnState();
        }, true);

        vm.toggleTabs = function (val) {

            if (val === 1 && createOrgSvc.getOrganizationDetails() === null) {
                createOrgSvc.setOrganizationDetails(false);
            } else if (val === 2 && createOrgSvc.getPlanDetails() === null) {
                createOrgSvc.setPlanDetails(true);
            } else if (val === 3 && createOrgSvc.getBillingDetails() === null) {
                createOrgSvc.setBillingDetails(false);
            }



            vm.selectedTabSignup = val;

        }
        /*Function for toggling tabs end  */

        /*Function to set validation flags */
        //vm.setValidationFlag = function(){
        //    if (vm.selectedTabSignup === 1 && createOrgSvc.getOrganizationDetails() === null) {
        //        createOrgSvc.setOrganizationDetails(false);

        //    }
        //    else if (vm.selectedTabSignup === 2 && createOrgSvc.getPlanDetails() === null) {
        //        createOrgSvc.setPlanDetails(false);

        //    }
        //    else if (vm.selectedTabSignup === 3 && createOrgSvc.getBillingDetails() === null) {
        //        createOrgSvc.setBillingDetails(false);

        //    }
        //}

        //function to set classes as per validation for Organization details
        vm.getOrgDetailsClass = function () {
            if (vm.selectedTabSignup === 1) {
                return 'trial_step_active';
            } else if (vm.selectedTabSignup !== 1 && createOrgSvc.getOrganizationDetails() === null) {

                return '';
            } else if (vm.selectedTabSignup !== 1 && createOrgSvc.getOrganizationDetails() === false) {

                return 'trial_step_invalid';
            } else if (vm.selectedTabSignup !== 1 && createOrgSvc.getOrganizationDetails() === true) {

                return 'trial_step_valid';
            }
        }

        //function to set classes as per validation for Plan details
        vm.getPlanDetailsClass = function () {
            if (vm.selectedTabSignup === 2) {
                return 'trial_step_active';
            } else if (vm.selectedTabSignup !== 2 && createOrgSvc.getPlanDetails() === null) {

                return '';
            } else if (vm.selectedTabSignup !== 2 && createOrgSvc.getPlanDetails() === false) {

                return 'trial_step_invalid';
            } else if (vm.selectedTabSignup !== 2 && createOrgSvc.getPlanDetails() === true) {

                return 'trial_step_valid';
            }
        }

        //function to set classes as per validation for Billing address
        vm.getBilligAddressClass = function () {
            if (vm.selectedTabSignup === 3) {
                return 'trial_step_active';
            } else if (vm.selectedTabSignup !== 3 && createOrgSvc.getBillingDetails() === null) {

                return '';
            } else if (vm.selectedTabSignup !== 3 && createOrgSvc.getBillingDetails() === false) {

                return 'trial_step_invalid';
            } else if (vm.selectedTabSignup !== 3 && createOrgSvc.getBillingDetails() === true) {

                return 'trial_step_valid';
            }
        }

        //function to change state of create button//

        vm.changeCreateBtnState = function () {
            if (createOrgSvc.getBillingDetails() && createOrgSvc.getPlanDetails() && createOrgSvc.getOrganizationDetails()) {
                vm.createBtnStateDisabled = false;
            } else {
                vm.createBtnStateDisabled = true;
            }
        }

        /*Function to set validation flags end here */

        //function to create organisation
        vm.createOrganisation = function () {
            var card = { 'number': vm.organisationModel.cardNumber, 'exp_month': vm.organisationModel.month, 'exp_year': vm.organisationModel.year, 'cvc': vm.organisationModel.cardCvv, };
            stripe.card.createToken(card).then(function(response){
                console.log(response);
                var token = response.id;
            },function(err){
                console.log(err);
            });

            planSvc.createPayment(vm.organisationModel.plans).then(function (response) {
                console.log(response);
            }, function (err) {
                console.log(err);
            });
            


            createOrgSvc.saveOrganisation(vm.organisationModel).then(function (response) {
                console.log(response);
                $state.go('billing');
            }, function (err) {
                console.log(err);
            })
        }
    }

})();