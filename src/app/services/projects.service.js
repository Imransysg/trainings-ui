(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('projectsSvc', projects);

    projects.$inject = ['httpservice', 'apiUrl', 'utilsService'];

    function projects(httpservice, apiUrl, utilsService) {
        var self = this;
        apiUrl = apiUrl + "/project-service";
        self.orgID = utilsService.getOrganization();
        //get all Projects.
        self.getProject = function() {
            var url = apiUrl + '/project';
            return httpservice.get(url, true);
        }

        //get project by organization
        self.getProjectByOrgID = function() {
            var url = apiUrl + '/org/' + self.orgID + "/project";
            return httpservice.get(url, true);
        }

        //get project by id inside organization.
        self.getProjectForOrgByProjectID = function(orgID, projectID) {
            var url = apiUrl + '/org/' + self.orgID + '/project/' + projectID;
            return httpservice.get(url, true);
        }

        //get project by name inside organization
        self.getProjectForOrgByProjectName = function(orgID, projectName) {
            var url = apiUrl + '/org/' + self.orgID + '/project/' + projectName;
            return httpservice.get(url, true);
        }

        //Create new project for organization
        self.createProjectByOrg = function(projectDetails) {
            var url = apiUrl + '/org/' + self.orgID + "/project";
            return httpservice.post(url, projectDetails, true);
        }

        //Update existing project for organization
        self.updateProjectByOrg = function(orgID, projectUpdates) {
            var url = apiUrl + '/org/' + self.orgID + '/project';
            return httpservice.put(url, projectUpdates, true);
        }

        //delete project for organization
        self.deleteProjectByOrg = function(orgID, projectID) {
            var url = apiUrl + '/org/' + self.orgID + '/project/' + projectID;
            return httpservice.delete(url, true);
        }

        return self;
    }
})();