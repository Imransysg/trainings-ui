(function() {
    'use strict';

    angular.module('veegam-trials').component('forgotPassword', {
        controller: forgotPasswordController,
        controllerAs: 'vm',
        templateUrl: 'app/components/forgotPassword/forgotPassword.view.html',
    });

    /** @ngInject */
    forgotPasswordController.$inject = ['$state', 'errorSvc', 'auth0Service'];

    function forgotPasswordController($state, errorSvc, auth0Service) {
        var vm = this;
        vm.showLoading = false;
        vm.forgotPassword = {};

        vm.forgotPasswordFn = function() {
            auth0Service.forgotPassword(vm.forgotPassword.email)
                .then(function(response) {
                    errorSvc.displayErrorString('ui-errors_11', 'success', 15);
                }, function(error) {
                    errorSvc.displayErrorString('ui-errors_10', 'error', 15);
                    errorSvc.logProcessing(error, 'error');
                });
        }
    }
})();