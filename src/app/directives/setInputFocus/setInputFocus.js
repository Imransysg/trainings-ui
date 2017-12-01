(function() {
    'use strict';

    angular.module('veegam-trials').directive('setInputFocus', function() {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    //alert(element.attr('id'));
                    document.querySelector('#' + attrs.setInputFocus + ' ' + 'input[type="search"]').focus();
                })
            }

        };
    })
})();