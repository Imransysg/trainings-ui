angular.module('veegam-trials').factory('demolabs', function() {
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

    // var supportingDoc = { type:'',items:[{
    //     title: '',
    //     url: '',
    //     id: '',// guid
    //     type: ''//static or dynamic
    // }]};

    var sharedDetails = {
        type: '',
        value: '',
        policy: '',
    };
    var output = {
        title: '',
        parameter: ''
    };

    var message = {
        type: '',
        value: '',
    }

    var demolabs = {
        id: '',
        status: 'draft',
        provider: 'oracle',
        name: '',
        description: '',
        createdBy: '',
        organization: '',
        owner: '',
        template: {
            project_id: '',
        },
        usermanual: [],
        emails: [],
        configuration: {
            duration: undefined,
            deploymentTime: undefined,
            deploymentTimeType: '',
            concurrencyLimit: undefined,
            perUserLimit: undefined,
            outputs: '',
            //outputs: [],
            messages: [],
            callbackURL: '',
            callbacks:[]
        },
        images: [],
        icons: [],
        videos: [],
        supportingDocs: [],
        cloudProvider: {
            type: '',
            provider_account_id: '',
        },
        permissions: {
            public: false,
            sharedWith: []
        }
    }

    var demoLabData = {};
    return {
        demolabs: demolabs,
        email: email,
        image: image,
        video: video,
        sharedDetails: sharedDetails,
        output: output,
        message: message,
        demoLabData: demoLabData
    }
})