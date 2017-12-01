(function() {
    'use strict';

    angular.module('veegam-trials').component('myTrainings', {
        controller: MyTrainingsController,
        controllerAs: 'vm',
        templateUrl: 'app/components/myTrainings/myTrainings.view.html',
    });

    /** @ngInject */
    MyTrainingsController.$inject = ['$element', '$scope', '$state', 'trainingsSvc', 'errorSvc', 'uploadDataSvc', 'pubnubSvc', 'utilsService'];

    function MyTrainingsController($element, $scope, $state, trainingsSvc, errorSvc, uploadDataSvc, pubnubSvc, utilsService) {
        var vm = this;
        vm.trainingStep = [];
        vm.selectedStep = {};
        vm.continueDisabled = false;
        trainingsSvc.hideSidebar(false);
        var vm = this;
        // vm.trialLoading = true;

        // vm.userId = trialService.userID;
        vm.trainingsData = [];
        $element.addClass('display-block height100');

        // Method to open create new demo lab modal
        vm.openCreateTrainingDialog = function(value) {
            trainingsSvc.hideSidebar(true);
            trainingsSvc.setCreateTrainingFlag(value);
            $state.go('trainings.trainingsCreate');
        };
    }

})();