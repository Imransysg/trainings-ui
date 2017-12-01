(function() {
    'use strict';

    angular.module('veegam-trials').component('sidemenu', {
        controller: MenuController,
        controllerAs: 'vm',
        templateUrl: 'app/directives/sidemenu/sidemenu.view.html',
    });

    /** @ngInject */
    MenuController.$inject = ['$state'];

    function MenuController($state) {
        var vm = this;
        vm.currentState = $state.$current.name;

    }

})();