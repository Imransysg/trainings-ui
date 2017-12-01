(function() {
    'use strict';

    angular.module('veegam-trials').filter('ellipsis', function() {
        return function(value, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;

            var result = value.substr(0, max);

            if (result.length < max)
                return result;
            else
                return result + (tail || ' ...');
        };
    });
})();