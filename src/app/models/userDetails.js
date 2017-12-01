angular.module('veegam-trials').factory('userDetails', function() {

    var user = {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        tnc: '',
        company: '',
        zipCode: '',
        country: '',
        userType: 'user',
        eula_version: '0.0'
    };
    return {
        userModel: user
    }
});