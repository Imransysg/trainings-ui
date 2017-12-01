angular.module('veegam-trials').factory('projects', function() {
    // var projectTypes = {
    //     zip: 'zip',
    //     git: 'github'
    // };

    var projectResponse = {
        projectName: '',
        projectDescription: '',
        projectType: '',
        orgId: '',
        project_id: '',
        projectDetails: {}, //can be zip/github
    }

    var projectCreate = {
        projectName: '',
        projectDescription: '',
        terraformVersion: '',
        projectType: '',
        projectDetails: {}, //can be zip/github
    }

    // var projectUpdates = {
    //     projectName: '',
    //     projectDescription: '',
    //     orgId: '',
    //     project_id: '',
    //     Projects: projectsDetails,
    // };

    var gitProjectDetails = {
        githubAccountName: '',
        githubRepoName: '',
        githubSubfolderName: '',
        githubRepoBranch: '',
    };

    var zipProjectDetails = {
        id: '',
        url: '',
        title: ''
    };

    return {
        projectResponse: projectResponse,
        projectCreate: projectCreate,
        gitProjectDetails: gitProjectDetails,
        zipProjectDetails: zipProjectDetails,
    }
});