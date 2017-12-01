(function() {
    'use strict';

    angular.module('veegam-trials').component('resetPassword', {
        controller: resetPasswordController,
        controllerAs: 'vm',
        templateUrl: 'app/components/resetPassword/resetPassword.view.html',
    });

    /** @ngInject */
    resetPasswordController.$inject = ['$state', 'errorSvc'];

    function resetPasswordController($state, errorSvc) {
        var vm = this;
        vm.showLoading = false;
        vm.resetPassword = {};

        vm.resetPasswordFn = function() {
            console.log("form submitted successfully");
        }
    }
})();