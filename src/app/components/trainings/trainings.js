(function() {
    'use strict';

    angular.module('veegam-trials').component('trainings', {
        controller: TrainingsController,
        controllerAs: 'vm',
        templateUrl: 'app/components/trainings/trainings.view.html',
    });

    /** @ngInject */
    TrainingsController.$inject = ['$scope', '$element', 'trainingsSvc', '$state', 'httpservice'];

    function TrainingsController($scope, $element, trainingsSvc, $state, httpservice) {
        var vm = this;
        vm.trainingMenu = [];
        vm.parentState = 'trainings';
        vm.activeNavMenu = 'myTrainings';
        vm.sidebarShown = trainingsSvc.hideSidebarSection;
        // Method to get menu list
        function getMenu() {
            httpservice.get('./data/trainingsMenu.json', false)
                .then(function(res) {
                    vm.trainingMenu = res.data.trainingsMenu;
                }, function(err) {
                    console.log("Error in fetching data from json: " + err);
                });
        }

        // Method to route to nav menu
        function goToNavMenu() {
            $state.go(vm.parentState + '.' + vm.activeNavMenu);
        }

        // Method to intialize the component
        function activate() {
            getMenu();
            var currentState = $state.$current.name;
            if (currentState != vm.parentState) {
                vm.activeNavMenu = currentState.split('.')[1];
            }
            // vm.sidebarShown = trainingsSvc.hideSidebarSection;
            goToNavMenu();
        }

        activate();
    }

})();