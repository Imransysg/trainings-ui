(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('errorSvc', errorSvc);

    errorSvc.$inject = ['errorMessageStrings', 'toastr', '$logentries', 'Guid'];

    function errorSvc(errorMessageStrings, toastr, $logentries, Guid) {
        var self = this;
        var data = errorMessageStrings.errorMessages;
        var dataBackend = errorMessageStrings.displayBackendCodes

        var _getErrorString = function(errorCode, message) {
            var arrErrorCode = errorCode.split('_');
            var service = arrErrorCode[0];
            var code = arrErrorCode[1];
            if (dataBackend[service]) {
                return message ? message : dataBackend[service][code];
            } else {
                return data[service][code] ? data[service][code] : 'no error code found';
            }
        };

        self.logProcessing = function(log, type) {

            //log entries
            var traceId = Guid.newGuid();
            if (log.headers && log.headers('ocp-apim-trace-location')) {
                traceId = log.headers('ocp-apim-trace-location').split("&traceId")[1];
            }
            switch (type) {
                case "error":
                    $logentries.error({ traceId: traceId, message: log && log.data ? log.config.url + ': ' + JSON.stringify(log.data) : JSON.stringify(log) });
                    break;
                default:
                    $logentries.log({ traceId: traceId, message: log && log.data ? log.config.url + ': ' + JSON.stringify(log.data) : JSON.stringify(log) });
            }
        };

        self.displayErrorString = function(errorCode, type, timeToClose, messageToDisplay) {

            var message = _getErrorString(errorCode, messageToDisplay);
            timeToClose = timeToClose * 1000;
            switch (type) {
                case 'info':
                    toastr.info(message, 'Info', {
                        timeOut: timeToClose,
                        tapToDismiss: false
                    });
                    break;
                case 'warning':
                    toastr.warning(message, 'Warning', {
                        timeOut: timeToClose,
                        tapToDismiss: false
                    });
                    break;
                case 'success':
                    toastr.success(message, 'Success', {
                        timeOut: timeToClose,
                        tapToDismiss: false
                    });
                    break;
                case 'error':
                    toastr.error(message, 'Error', {
                        timeOut: timeToClose,
                        tapToDismiss: false,
                    });
                    break;
            }
        };

        self.displayConfirmation = function(obj) {
            $('#backdropBg').css('display', 'block');
            var html = '';
            for (var index = 0; index < obj.buttons.length; index++) {
                html = html + "<button type='button' id='btn_" + (index + 1) + "' class='btn clear toastr_conf_btn button-default'>" + obj.buttons[index].text + "</button>";
            }
            toastr.info(html, obj.message, {
                closeButton: false,
                timeOut: 0,
                extendedTimeOut: 0,
                tapToDismiss: false,
                allowHtml: true,
                iconClasses: {
                    info: 'toast-information',
                },
                titleClass: 'toast-title toast-conf-title',
                messageClass: 'toast-message toast-conf-message',
                // onShown: function(toast) {
                onShown: function() {
                    for (var indexBtn = 0; indexBtn < obj.buttons.length; indexBtn++) {
                        var button = obj.buttons[indexBtn];
                        var id = "btn_" + (indexBtn + 1);
                        var callback = button.callback;
                        (function(id, callback) {
                            $("#" + id).click(callback);
                        })(id, callback);
                    }
                }
            });
        };

        self.closeToastr = function() {
            $('#backdropBg').css('display', 'none');
            toastr.clear();
        };

        // self.logErrorString = function(errorCode) {
        self.logErrorString = function() {
            // var arrErrorCode = errorCode.split('_');
            // var service = arrErrorCode[0];
            // var code = arrErrorCode[1];
            // return data[service][code] ? data[service][code] : 'no error code found';
        };

    }
})();