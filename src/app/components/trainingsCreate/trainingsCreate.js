(function() {
    'use strict';

    angular.module('veegam-trials').component('trainingsCreate', {
        controller: TrainingsCreateController,
        controllerAs: 'vm',
        templateUrl: 'app/components/trainingsCreate/trainingsCreate.view.html',
    });

    /** @ngInject */
    TrainingsCreateController.$inject = ['$scope', '$element', '$state', 'trainingsSvc', 'trainings', '$rootScope', 'errorSvc', 'customDialog', '$stateParams'];

    function TrainingsCreateController($scope, $element, $state, trainingsSvc, trainings, $rootScope, errorSvc, customDialog, $stateParams) {
        var vm = this;
        $element.addClass('display-block height100');
        vm.trainingStep = [];
        vm.selectedStep = {};
        vm.continueDisabled = false;
        vm.pageToShow = 1;
        vm.createTrainingFg = '';
        vm.helpsectionWidth = 0;
        vm.createTrainingFlag = $stateParams.flag;

        function getTrainingInfo() {
            trainingsSvc.hideSidebar(true);
            vm.createTrainingFg = trainingsSvc.getCreateTrainingFlag();
        }

        getTrainingInfo();

        vm.getTrainingFlag = function() {
            vm.createTrainingFg = trainingsSvc.getCreateTrainingFlag();
            return vm.createTrainingFg;
        }

        //to switch to previous step
        vm.prev = function() {
            if (vm.pageToShow > 1) {
                vm.pageToShow -= 1;
            }
            setflags();
        }

        //to switch to next step
        vm.next = function() {
            if (vm.pageToShow < 5) {
                vm.pageToShow += 1;
            }
            setflags();
        }

        //to disable arrow to swich to next tab in case last tab is reached
        vm.getNextDisabled = function() {
            if (vm.pageToShow === 5) {
                return 'arrow_button_disabled';
            }
            return '';
        }

        //to disable arrow to swich to previos tab in case first tab is reached
        vm.getPrevDisabled = function() {
            if (vm.pageToShow === 1) {
                return 'arrow_button_disabled';
            }
            return '';
        }

        //function to set current tab visible
        vm.setPageToShow = function(val) {
            vm.pageToShow = val;
            setflags();
        }


        //function to set flags for validation of tabs.
        function setflags() {
            if (vm.pageToShow === 1 && trainingsSvc.getTrainingCurriculumDetailsValidate() === null) {
                trainingsSvc.getTrainingCurriculumDetailsValidate(false);
            } else if (vm.pageToShow === 2 && trainingsSvc.getTrainingLandingDetailsValidate() === null) {
                trainingsSvc.getTrainingLandingDetailsValidate(false);
            } else if (vm.pageToShow === 3 && trainingsSvc.getTrainingAdvancedDetailsValidate() === null) {
                trainingsSvc.getTrainingAdvancedDetailsValidate(true);
            }
        }

        // Method to handle help box data
        $scope.$on('trainingHelpSection', function(evt, data) {
            if (data === 'cancel') {
                vm.helpClose();
            } else {
                vm.helpMessage = data;
            }
        });

        // Method to close help box
        vm.helpClose = function() {
            vm.helpMessage = '';
            vm.helpsectionWidth = 0;
        }

        // Method to return path of help file
        vm.getHelpPath = function() {
            if (vm.helpMessage) {
                vm.helpsectionWidth = 20;
                return 'data/' + vm.helpMessage + '.md';
            } else {
                return ''
            };
        }

        // publish stack
        vm.publishStack = function() {
            vm.confirmYes();
        }


        //get basic tab css based on valiadtion
        vm.getLabLandingTabClass = function() {
            if (vm.pageToShow === 2) {
                return 'training_step_active';
            } else if (vm.pageToShow !== 2 && trainingsSvc.getTrainingLandingDetailsValidate() === null) {
                return 'training_step_inactive';
            } else if (vm.pageToShow !== 2 && trainingsSvc.getTrainingLandingDetailsValidate() === false) {
                return 'training_step_invalid';
            } else if (vm.pageToShow !== 2 && trainingsSvc.getTrainingLandingDetailsValidate() === true) {
                return 'training_step_valid';
            }
        }

        //get advanced tab css based on valiadtion
        vm.getLabCurriculumTabClass = function() {
            if (vm.pageToShow === 1) {
                return 'training_step_active';
            } else if (vm.pageToShow !== 1 && trainingsSvc.getTrainingCurriculumDetailsValidate() === null) {
                return 'training_step_inactive';
            } else if (vm.pageToShow !== 1 && trainingsSvc.getTrainingCurriculumDetailsValidate() === false) {
                return 'training_step_invalid';
            } else if (vm.pageToShow !== 1 && trainingsSvc.getTrainingCurriculumDetailsValidate() === true) {
                return 'training_step_valid';
            }
        }

        //get cloud provider tab css based on valiadtion
        vm.getAdvancedTabClass = function() {
            if (vm.pageToShow === 3) {
                return 'training_step_active';
            } else if (vm.pageToShow !== 3 && trainingsSvc.getTrainingAdvancedDetailsValidate() === null) {
                return 'training_step_inactive';
            } else if (vm.pageToShow !== 3 && trainingsSvc.getTrainingAdvancedDetailsValidate() === false) {
                return 'training_step_invalid';
            } else if (vm.pageToShow !== 3 && trainingsSvc.getTrainingAdvancedDetailsValidate() === true) {
                return 'training_step_valid';
            }

        }

        vm.cancel = function() {
            var objCustomDialog = angular.copy(customDialog.dialog);
            objCustomDialog.message = 'All unsaved changes will be discarded. Click yes to exit.';
            objCustomDialog.buttons = [{
                    text: 'Yes',
                    iconText: 'check_circle',
                    callback: vm.confirmYes
                },
                {
                    text: 'No',
                    iconText: 'cancel',
                    callback: vm.confirmNo
                }
            ];

            errorSvc.displayConfirmation(objCustomDialog);
        };

        vm.confirmYes = function() {
            trainingsSvc.resetAll();
            errorSvc.closeToastr();
            $state.go('trainings.myTrainings');
        }

        vm.confirmNo = function() {
            errorSvc.closeToastr();
        }


    }

})();