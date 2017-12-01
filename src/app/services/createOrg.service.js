(function() {
    'use strict';
    angular
        .module('veegam-trials')
        .service('createOrgSvc', createOrgSvc);

    createOrgSvc.$inject = ['lock', '$location', '$window', 'httpservice', 'apiUrl', 'utilsService'];

    function createOrgSvc(lock, $location, $window, httpservice, apiUrl, utilsService) {
        apiUrl = apiUrl + "/organizations";

        //orgId of logged in user
        var orgID = utilsService.getOrganization();

        //Flag to validate Organization Details
        var organizationDetailsValidate = null;

        //Flag to validate Choose plan
        var choosePlanValidate = null;

        //Flag to validate Billing details
        var billingDetailsValidate = null;


        //to set flag to validate Organization Details tab in publisher signup flow
        function setOrganizationDetails(flag) {
            organizationDetailsValidate = flag;
        }

        //to get flag to validate advance details tab in create demo lab flow
        function getOrganizationDetails() {
            return organizationDetailsValidate;
        }

        //to set flag to validate Choose Plan tab in publisher signup flow
        function setPlanDetails(flag) {
            choosePlanValidate = flag;
        }

        //to get flag to validate Choose Plan tab in create demo lab flow
        function getPlanDetails() {
            return choosePlanValidate;
        }

        //to set flag to validate Billing Details tab in publisher signup flow
        function setBillingDetails(flag) {
            billingDetailsValidate = flag;
        }

        //to get flag to validate Billing Details tab in create demo lab flow
        function getBillingDetails() {
            return billingDetailsValidate;
        }

        //save organisation
        function saveOrganisation(orgDetails) {
            var url = apiUrl + '/orgs';
            var orgObj = {
                "orgName": orgDetails.orgName,
                "orgDescription": orgDetails.orgDesc,
                "plan": orgDetails.plans,
                "location": orgDetails.country,
                "billingEmail": orgDetails.billingEmailId
            };
            return httpservice.post(url, orgObj, true);
        }

        return {
            getOrganizationDetails: getOrganizationDetails,
            setOrganizationDetails: setOrganizationDetails,
            getPlanDetails: getPlanDetails,
            setPlanDetails: setPlanDetails,
            getBillingDetails: getBillingDetails,
            setBillingDetails: setBillingDetails,
            saveOrganisation: saveOrganisation
        };
    }

})();