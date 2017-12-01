(function() {
    'use strict';
    angular
        .module('veegam-trials')
        .service('createTrialService', createTrialService);

    createTrialService.$inject = ['lock', '$location', '$window', 'httpservice', 'apiUrl', 'utilsService'];

    function createTrialService(lock, $location, $window, httpservice, apiUrl, utilsService) {
        apiUrl = apiUrl + "/labs-service";

        //orgId of logged in user
        var orgID = utilsService.getOrganization();

        //flag to validate basic details tab in create demo lab flow
        var basicDetailsValidate = null;
        //flag to validate advance details tab in create demo lab flow
        var advancedDetailsValidate = null;
        //flag to validate cloud account tab in create demo lab flow
        var cloudAccountValidate = null;
        //flag to validate project details tab in create demo lab flow
        var projectDetailsValidate = null;
        //flag to validate sharing settings tab in create demo lab flow
        var sharingSettingsValidate = null;
        //flag to enable/disable save as draft button on create demo lab screen
        var saveDraftEnable = null;

        //to reset all flags
        function resetAll() {
            basicDetailsValidate = null;
            advancedDetailsValidate = null;
            cloudAccountValidate = null;
            projectDetailsValidate = null;
            //disableNext = true;
            saveDraftEnable = null;
            sharingSettingsValidate = null;
        }

        //to get flag to enable/disable save as draft button on create demo lab screen
        function getSaveDraftEnable() {
            return saveDraftEnable;
        }

        //to set flag to enable/disable save as draft button on create demo lab screen
        function setSaveDraftEnable(val) {
            saveDraftEnable = val;
        }

        //to get flag to validate sharing settings tab in create demo lab flow
        function getSharingSettingsValidate() {
            return sharingSettingsValidate;
        }

        //to set flag to validate sharing settings tab in create demo lab flow
        function setSharingSettingsValidate(val) {
            sharingSettingsValidate = val;
        }

        //to get flag to validate basic details tab in create demo lab flow
        function getBasicDetailsValidate() {
            return basicDetailsValidate;
        }

        //to set flag to validate basic details tab in create demo lab flow
        function setBasicDetailsValidate(flag) {
            basicDetailsValidate = flag;
        }

        //to get flag to validate advance details tab in create demo lab flow
        function getAdvancedDetailsValidate() {
            return advancedDetailsValidate;
        }

        //to set flag to validate advance details tab in create demo lab flow
        function setAdvancedDetailsValidate(flag) {
            advancedDetailsValidate = flag;
        }

        //to get flag to validate cloud account tab in create demo lab flow
        function getCloudAccountValidate() {
            return cloudAccountValidate;
        }

        //to set flag to validate cloud account tab in create demo lab flow
        function setCloudAccountValidate(flag) {
            cloudAccountValidate = flag;
        }

        //to get flag to validate project details tab in create demo lab flow
        function getProjectDetailsValidate() {
            return projectDetailsValidate;
        }

        //to set flag to validate project details tab in create demo lab flow
        function setProjectDetailsValidate(flag) {
            projectDetailsValidate = flag;
        }

        //publish demo lab
        function publishDemoLab(demoLabDetails) {
            var url = apiUrl + '/org/' + orgID + "/demolabs";
            if (demoLabDetails.demolab_id) {
                return httpservice.put(url, demoLabDetails, true);
            } else {
                return httpservice.post(url, demoLabDetails, true);
            }
        }

        //save demo lab
        function saveDraftDemoLab(demoLabDetails) {
            var url = apiUrl + '/org/' + orgID + "/demolabs/draft";
            if (demoLabDetails.demolab_id) {
                return httpservice.put(url, demoLabDetails, true);
            } else {
                return httpservice.post(url, demoLabDetails, true);
            }
        }

        return {
            getBasicDetailsValidate: getBasicDetailsValidate,
            setBasicDetailsValidate: setBasicDetailsValidate,
            getAdvancedDetailsValidate: getAdvancedDetailsValidate,
            setAdvancedDetailsValidate: setAdvancedDetailsValidate,
            getCloudAccountValidate: getCloudAccountValidate,
            setCloudAccountValidate: setCloudAccountValidate,
            getProjectDetailsValidate: getProjectDetailsValidate,
            setProjectDetailsValidate: setProjectDetailsValidate,
            getSaveDraftEnable: getSaveDraftEnable,
            setSaveDraftEnable: setSaveDraftEnable,
            resetAll: resetAll,
            getSharingSettingsValidate: getSharingSettingsValidate,
            setSharingSettingsValidate: setSharingSettingsValidate,
            publishDemoLab: publishDemoLab,
            saveDraftDemoLab: saveDraftDemoLab
        };
    }

})();