angular.module('veegam-trials').factory('stacks', function() {
    var email = {
        type: '',
        email: '',
    };
    var image = {
        title: '',
        url: ''
    };
    var video = {
        title: '',
        url: '',
    };
    var diagram = {
        title: '',
        url: ''
    };
    var sharedDetails = {
        type: '',
        value: '',
        policy: '',
    };
    var output = {
        title: '',
        parameter: ''
    };
    var billing = {
        id: '',
        title: '',
        description: ''
    };

    var message = {
        type: '',
        value: '',
    };

    var stacks = {
        id: '',
        status: 'draft',
        provider: 'oracle',
        name: '',
        category: [],
        description: {
            short: '',
            long: ''
        },
        additionalDescription: {
            stackComponents: '',
            deploymentSteps: ''
        },
        createdBy: '',
        organization: '',
        owner: '',
        template: {
            project_id: '',
        },
        usermanual: [],
        emails: [],
        configuration: {
            allowTemplateDownload: false,
            duration: undefined,
            deploymentFailureMessage: '',
            deploymentSuccessMessage: '',
            stackEndMessage: '',
            publisher_eula: '',
            events: [],
            related: []
        },
        images: [],
        diagram: [],
        billingDetails: [],
        icons: [],
        videos: [],
        supportingDocs: [],
        changeRequest: false,
        cloudProvider: {
            type: '',
            provider_account_id: '',
        },
        permissions: {
            public: false,
            sharedWith: []
        },
        userLinkedCloud: []
    };

    var cloudAccountUserData = {
        emailId: '',
        cloudAccount: {
            type: '',
            provider_account_id: '',
        },
        showCloudAccountForm: false,
        totalDeployments: '',
        proxyAddress: {
            address: '',
            isOpened: false
        },
        virtualMachine: {
            machineAddress: '',
            isOpened: false
        },
        configurationHidden: true
    };

    var emailEvent = {
        triggerDays: undefined,
        templateName: '',
        replyTo: '',
        title: '',
        body: ''
    };

    var stackData = {};

    var stackFlag = {
        flag: ''
    };

    return {
        stacks: stacks,
        email: email,
        image: image,
        video: video,
        sharedDetails: sharedDetails,
        output: output,
        message: message,
        emailEvent: emailEvent,
        stackData: stackData,
        stackFlag: stackFlag,
        billing: billing,
        cloudAccountUserData: cloudAccountUserData
    };
});