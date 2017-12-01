(function () {
    'use strict';

    angular.module('veegam-trials').run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $location, $transitions, Pubnub, PubnubPublishKey, PubnubSubscribeKey, utilsService) {
        $log.debug('App run end');
        
        $transitions.onStart({}, function (trans) {
            if (localStorage.getItem("idToken") !== null) {
                var tokenExpInMillisecond = parseInt(utilsService.getExpTime()) * 1000;
                if (new Date().getTime() - tokenExpInMillisecond >= 0) {
                    localStorage.removeItem("idToken");
                    localStorage.removeItem("payload");
                }
            }
            if (trans.targetState().name().toString().toLowerCase() != 'login' && trans.targetState().name().toString().toLowerCase() != 'signup' && trans.targetState().name().toString() != 'demoLab.publicPreview' && trans.targetState().name().toString().toLowerCase() != 'forgotpassword' && trans.targetState().name().toString().toLowerCase() != 'termsservice') {
                if (localStorage.getItem("idToken") === null || localStorage.getItem("idToken") === '') {
                    // User isn't authenticated. Redirect to a new Target State
                    var url = $location.absUrl();
                    return trans.router.stateService.target('login', { 'callBackState': url });
                }
            }
        });

        //Initialize Pubnub for realtime interaction
        Pubnub.init({
            publishKey: PubnubPublishKey,
            subscribeKey: PubnubSubscribeKey
        });
    }

})();