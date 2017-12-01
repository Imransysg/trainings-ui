angular.module('veegam-trials').factory('trainings', function() {
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
    var sharedDetails = {
        type: '',
        value: '',
        policy: '',
    };
    var contentSteps = {
        id: '',
        title: '',
        expandable: true,
        contentType: 'htmlEditor',
        confirmationType: 'htmlEditor',
        stepContent: '',
        uploadDocument: null
    }
    var workspace = {
        workspace_id: '',
        type: '',
        name: ''
    }

    var cloudPool = {
        pool_id: '',
        name: '',
        accountAttached: undefined
    }

    var projectList = [];

    var section = {
        id: '',
        secName: '',
        title: '',
        project: {
            projectInfo: {},
            variables: []
        },
        workspaces: [],
        confirmationSteps: {
            ConfirmationStepFlag: false
        },
        contentBuilder: []
    }

    var trainings = {
        id: '',
        status: 'draft',
        provider: 'oracle',
        name: '',
        category: [],
        coAuthor: [],
        shortDescription: '',
        longDescription: '',
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
            related: [],
            perUserLimit: undefined,
            deploymentUserLimitMsg: '',
            concurrencyLimitMsg: ''
        },
        images: [],
        diagram: [],
        icons: [],
        labImage: {},
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
        title: '',
        authorName: '',
        skillLevel: '',
        preRequisites: '',
        sections: [],
        streams: [],
        previewImage: [],
        linkCloudPools: []
    };

    var trainingData = {};

    var trainingFlag = {
        flag: ''
    };

    var sharingSettingsObj = {
        myOrg: false,
        collaborators: false,
        myOrgName: 'Sysgain CI',
        user: {
            orgID: '',
            organizations: [],
            users: [],
            selectedUserList: [],
            selectedOrg: '',
            savedUser: [],
            selectedUser: ''
        },
        team: {
            orgName: '',
            selectedOrg: '',
            organizations: [],
            teams: [],
            savedTeam: [],
            selectedTeam: ''
        },
        organizations: {
            organizationsList: [],
            selectedOrganization: '',
            savedOrganization: []

        },
        emailDomain: {
            domain: '',
            savedDomain: []
        },
        email: {
            selectedEmail: ''
        }
    };

    return {
        trainings: trainings,
        email: email,
        image: image,
        video: video,
        sharedDetails: sharedDetails,
        trainingData: trainingData,
        trainingFlag: trainingFlag,
        contentSteps: contentSteps,
        projectList: projectList,
        section: section,
        sharingSettingsObj: sharingSettingsObj,
        workspace: workspace,
        cloudPool: cloudPool
    };
});