(function() {
    'use strict';

    angular.module('veegam-trials').filter("trustUrl", ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
})();