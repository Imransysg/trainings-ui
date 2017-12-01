(function() {
    'use strict';

    angular.module('veegam-trials').directive('niceScrollResize',['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, element, attrs) {
                element.bind("click", function() {
                    // scroll resize issue when views get changed in modal dialog
                    // Will remove jquery dependency once have alternative option
                    $timeout(function() {
                        if ($('#' + attrs.niceDiv).getNiceScroll) {
                            $('#' + attrs.niceDiv).getNiceScroll().resize();
                            if (attrs.niceScrollTop != null) {
                                $('#' + attrs.niceDiv).scrollTop(0);
                            }                            
                        }
                    }, 350);

                });
            }

        };
    }])
})();