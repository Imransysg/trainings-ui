angular.module('veegam-trials').factory('providers', function () {

    var providerDetails = {
        providerType: '',
        tenancy_OCID: '',
        user_OCID: '',
        compartment_OCID: '',
        fingerprint: '',
        private_Key_Path: '',
        accountName: '',
        accountDesc: ''
    };

    var providerForOrg = {
        //organization: '',
       // provider_id: '',
        provider_details: providerDetails,
    };

    var providerUpdate = {
        provider_id: '',
        provider_details: providerDetails,
    };

    return {
        providerDetails: providerDetails,
        providerForOrg: providerForOrg,
        providerUpdate: providerUpdate,
    }
});