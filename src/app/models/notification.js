angular.module('veegam-trials').factory('notification', function() {

    var demoLabShare = {
        emailType: 'share',
        to: '', // email of shared person from input field
        demoLabName: '',
        message: '',
        demoPageUrl: '',
        senderName: '', // user's name from input field
        senderEmail: '' // user's email from input field
    };

    var demoLabContactUs = {
        emailType: 'contact',
        to: '', // demo lab publisher email (contact email)
        demoLabName: '',
        message: '',
        publisherName: '',
        requestorName: '', // user's name from input field
        requestorEmail: '' // user's email from input field
    };

    var demoLabRequestPilot = {
        emailType: 'pilot',
        to: '', // demo lab publisher email (contact email)
        demoLabName: '',
        publisherName: '',
        requestorName: '', // user's name from input field
        requestorEmail: '' // user's email from input field
    };



    return {
        demoLabShare: demoLabShare,
        demoLabContactUs: demoLabContactUs,
        demoLabRequestPilot: demoLabRequestPilot
    }


});