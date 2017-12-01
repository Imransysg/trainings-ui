angular.module('veegam-trials').factory('errorMessageStrings', function() {
    var displayBackendCodes = {
        'concurrency': {
            'limit': 'Concurrency limit reached. Please contact your administrator',
        },
        'user': {
            'limit': 'Allowed user limit reached. Please contact your administrator',
        },
        'deployment': {
            'failure': 'Something has gone wrong. Please try after some time. If issue persists please contact administrator.',
        },
        'signup': {
            'invaliddomain': 'Social email is not allowed, please use organization email for signup.',
        },
        'signin': {
            'emailnotverified': 'Please verify your email before logging in to check.'
        },
        'auth0': {
            'statuspending': 'Your account has not been approved. Please try later.'
        }

    }
    var errorMessages = {
        'code': {
            '1': "Access denied to specified demolab."
        },
        'labs-service': {
            '1': 'Project Id specified does not exist.',
            '2': 'Provider Id specified does not exist.',
            '3': 'Specified Demolabs Id does not exist.',
            '4': 'Specified Organization Id does not exist',
            '5': 'Cannot Get all demolabs.',
            '6': 'Cannot Delete the demolab.',
            '7': 'You are not authorised to perform this operation.'
        },
        'provider-service': {
            '200': '',
            '400': '',
            '404': '',
            '401': '',
            '201': ''
        },
        'project-service': {
            '1': 'There is an issue while creating the project. Please try again',
            '2': 'Selected Project does not exist',
            '3': 'Selected Project does not exist',
            '4': 'Not getting list of projects. Please refresh the page or reload the tab',
            '5': 'There is an issue arise while updating the project. Please try again',
            '6': 'Can not delete the project. Please try again',
            '7': 'No Project exists for the specified Organization.',
        },
        'signup-service': {
            '1': 'Some error while signing up!! Please try after some time',
            '200': '',
            '400': '',
            '404': '',
            '401': '',
            '201': ''
        },
        'storage-service': {
            '200': '',
            '400': '',
            '404': '',
            '401': '',
            '201': ''
        },
        'deployment-service': {
            '1': 'This Demolab already has its maximum concurrent instances running. Please try again after some time.',
            '2': 'Something has gone wrong. Please try after some time. If issue persists please contact administrator.',
            '3': 'Something has gone wrong. Please try after some time. If issue persists please contact administrator.',
            '4': 'Something has gone wrong. Please try after some time. If issue persists please contact administrator.',
            '5': 'Something has gone wrong. Please try after some time. If issue persists please contact administrator.',
            '6': 'This Demo lab has been launched to its maximum. Please contact administrator for further details.',
            '7': 'Demolab deployment is still in progress. Please try after some time.',
            '8': 'Something has gone wrong. Please try after some time. If issue persist please contact administrator.',
            '9': 'Something has gone wrong. Please try after some time. If issue persist please contact administrator.',
            '10': 'Something has gone wrong. Please try after some time. If issue persist please contact administrator.'
        },
        'ui-errors': {
            '1': 'You have already uploaded the document. Please try to upload another document',
            '2': 'Please upload standard document files only.',
            '3': 'Name of video already present.',
            '4': 'Please upload videos only.',
            '5': 'Name of image already present.',
            '6': 'Please upload images only(jpg, jpeg, png, bmp, svg)',
            '7': 'Size of File exceeds the upper limit. Please upload the file has size upto 50MB',
            '8': 'You can upload only zip, tar, 7z or winrar file',
            '9': 'Size of File exceeds the upper limit. Please upload the file has size upto 150MB',
            '10': 'There is some error in sending mail to the specified address. Please try again.',
            '11': 'We have just sent you an email to reset your password. Please reset your password and then try again to login.',
            '12': 'Error uploading one or more files. Please try again.',
            '13': 'A link to this demo lab has been shared successfully to the email provided by you.',
            '14': 'Something has gone wrong. Please try after some time. If issue persist please contact administrator.',
            '15': 'Your request has been sent to the publisher of this demo lab successfully.'
        },
        'my-demo-labs': {
            '1': 'Internal Server Error!! Please try after some time',
            '2': 'Demo Lab deleted successfully',
            '3': 'Error deleting Demo Lab',
            '4': 'Error fetching images for Demo Labs',
        },
        'login-service': {
            '1': 'Incorrect email/password. Please retry!!'
        },
        'eula-service': {
            '1': 'Error in getting EULA. Please try again.',
            '2': 'Error while updating EULA. Please try again.',
            '3': 'Thank you for your support. Please continue.',
            '404': '',
            '401': '',
            '201': ''
        }
    };

    return {
        errorMessages: errorMessages,
        displayBackendCodes: displayBackendCodes
    }
});