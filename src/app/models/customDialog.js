angular.module('veegam-trials').factory('customDialog', function () {
    var dialog = {
        message: '',
        buttons: []
    };
    var button = {
        text: '',
        callback: '',
        params:{}
    };
    var type = {
        info: 'info',
        warning: 'warning',
        success: 'success',
        error: 'error'
    };

    return {
        dialog: dialog,
        button: button,
        messageType: type
    };
});