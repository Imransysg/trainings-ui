(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('providerSvc', providers);

    providers.$inject = ['httpservice', 'apiUrl', 'utilsService'];

    function providers(httpservice, apiUrl, utilsService) {
        var self = this;
        apiUrl = apiUrl + "/provider-service/org/" + utilsService.getOrganization();

        //get all providers by organization
        self.getProvidersByOrgID = function() {
            // var orgID = utilsService.getOrganization();
            //var url = apiUrl + '/org/' + orgID + '/provider';
            var url = apiUrl + "/provider";
            return httpservice.get(url, true);
        }

        //get project by id inside organization.
        self.getProvidersForOrgByProviderID = function(orgID, providerID) {
            var url = apiUrl + '/provider/' + providerID;
            return httpservice.get(url, true);
        }

        //Create new project for organization
        self.createProviderByOrg = function(providerForOrg) {
            // var orgID = utilsService.getOrganization();
            // var url = apiUrl + '/org/' + orgID + '/provider';
            var url = apiUrl + "/provider";
            return httpservice.post(url, providerForOrg, true);
        }

        //Update existing project for organization
        self.updateProviderByOrg = function(orgID, providerUpdate) {
            var url = apiUrl + '/org/' + orgID + '/provider';
            return httpservice.put(url, providerUpdate, true);
        }

        //delete project for organization
        self.deleteProjectByOrg = function(orgID, providerID) {
            var url = apiUrl + '/provider/' + providerID;
            return httpservice.delete(url, true);
        }

        return self;
    }
})();