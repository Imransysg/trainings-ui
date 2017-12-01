(function() {
    'use strict';

    angular.module('veegam-trials').component('toolbar', {
        controller: ToolbarController,
        controllerAs: 'vm',
        templateUrl: 'app/directives/toolbar/toolbar.view.html',
    });

    /** @ngInject */
    ToolbarController.$inject = ['$location', '$mdPanel', '$scope', '$state', '$stateParams', 'auth0Service', 'httpservice', 'utilsService'];

    function ToolbarController($location, $mdPanel, $scope, $state, $stateParams, auth0Service, httpservice, utilsService) {
        var vm = this;
        //vm.authService = authService;
        vm.publicPath = $state.$current.name == 'demoLab.publicPreview' ? true : false;
        vm.username;
        vm.orgname;
        if (!vm.publicPath) {
            vm.username = utilsService.getUserName();
            vm.orgname = utilsService.getOrganization();
        }

        // vm.go = function(path) {
        //     $location.path(path);
        // };
        //vm.goFullscreen = toggleFullScreen;
        var userProfile = localStorage.getItem('userProfile');
        vm.userProfile = JSON.parse(userProfile);

        // function toggleFullScreen() {
        //     // Fullscreen
        //     if (Fullscreen.isEnabled())
        //         Fullscreen.cancel();
        //     else
        //         Fullscreen.all();
        // }

        activate(vm.publicPath);

        function activate(value) {
            var user = localStorage.getItem('idToken');
            if (user) {
                vm.showUser = true;
                vm.username = utilsService.getUserName();
                vm.orgname = utilsService.getOrganization();
            } else {
                vm.showUser = false;
            }
        }

        $scope.$on('signedInUser', function(res) {
            // console.log(res);
            activate(res);
        });

        vm.myDropdownIsActive = false;

        vm.openDropdown = function() {
            vm.myDropdownIsActive = !vm.myDropdownIsActive;
        }

        vm.logout = function() {
            localStorage.removeItem("idToken");
            localStorage.removeItem('user');
            localStorage.removeItem("payload");
            auth0Service.setUserDetails(null);
            //$state.go('login', {}, {reload: 'login'});
            if (!vm.publicPath) {
                window.location.href = "/";
            } else {
                vm.showUser = false;
                window.location.reload();
            }
        }

    }

})();