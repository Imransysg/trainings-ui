(function() {
    'use strict';

    angular.module('veegam-trials').directive('inputNumber', function() {
        return {
            restrict: 'AE',
            scope: {},
            link: function(scope, element) {
                element.bind("keydown", function(changeEvent) {
                    if (changeEvent.key.toLowerCase() === 'e' || changeEvent.key.toLowerCase() === '-' || changeEvent.key.toLowerCase() === '+' || changeEvent.key.toLowerCase() === '.') {
                        changeEvent.preventDefault();
                    }

                });
            }

        };
    })
})();