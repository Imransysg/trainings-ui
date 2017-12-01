(function() {
    'use strict';

    angular.module('veegam-trials').config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('login', {
                url: '/',
                component: 'login',
                params: {
                    callBackState: '',
                },
            })
            .state('signup', {
                url: '/signup',
                component: 'signup',
            })
            .state('forgotpassword', {
                url: '/forgotPassword',
                component: 'forgotPassword',
            })
            .state('resetPassword', {
                url: '/resetPassword',
                component: 'resetPassword',
            })
            .state('billing', {
                url: '/billing',
                component: 'billing',
            })
            .state('createOrganization', {
                url: '/AddOrganization',
                component: 'createOrganization',
            })

        .state('termsService', {
                url: '/terms-service?t&a',
                component: 'termsService',
            })
            .state('trainings', {
                url: '/trainings',
                component: 'trainings',
            })
            .state('trainings.myTrainings', {
                url: '/myTrainings',
                component: 'myTrainings',
            })
            .state('trainings.trainingsCreate', {
                url: '/createTraining',
                component: 'trainingsCreate',
            })
            .state('trainings.myStreams', {
                url: '/myStreams',
                component: 'myStreams',
            })
        $urlRouterProvider.otherwise('/');
    }

})();