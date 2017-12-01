(function () {
    'use strict';

    angular.module('veegam-trials').config(configBlock);

    /** @ngInject */
    function configBlock($locationProvider, $logProvider, lockProvider, AUTH0_CLIENT_ID, AUTH0_DOMAIN, $httpProvider, $compileProvider, toastrConfig, $logentriesProvider, LogEntries_Token, stripeProvider) {
        $locationProvider.html5Mode(true);
        $logProvider.debugEnabled(true);

        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Initialize lock for auth0
        lockProvider.init({
            clientID: AUTH0_CLIENT_ID,
            domain: AUTH0_DOMAIN,

        });

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width',
            toastClass: 'toast toast-custom-main',
        });

        // setDebug(true) outputs to console
        //$logentriesProvider.setDebug(true);        
        //if no token is given no logs will be sent to logentries        
        $logentriesProvider.init({ token: LogEntries_Token, catchall: true, page_info: 'per-page', trace: true });
        //Stripe.setPublishableKey('pk_test_yUswBCTjf4OZIVDKclxZcszi');

        //demo key

         stripeProvider.setPublishableKey('pk_test_yUswBCTjf4OZIVDKclxZcszi');
        //Stripe.setPublishableKey('pk_test_yUswBCTjf4OZIVDKclxZcszi');
    }

})();