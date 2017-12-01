angular.module('veegam-trials').factory('publisherDetails', function () {

    var publisher={
        name:'',
        organization:'',
        email:'',
        phone:'',
        requested_access:'',
        access_reason:'',
        tnc:'',
        username:'',
        password:'',
        userType: 'publisher',
        eula_version: '0.0' 
    };
    return {
        publisherModel:publisher,
    }
});