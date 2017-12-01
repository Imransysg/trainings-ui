(function() {
    'use strict';
    angular.module('veegam-trials')
        .service('trainingsSvc', trainingsSvcFn);

    trainingsSvcFn.$inject = ['apiUrl', 'httpservice', 'utilsService', 'trainings'];

    function trainingsSvcFn(apiUrl, httpservice, utilsService, trainings) {
        var self = this;
        // apiUrl = apiUrl + "/analytics-service";
        // vm.orgID = utilsService.getOrganization();
        var trainingModel = angular.copy(trainings);
        var shareSetting = angular.copy(shareSetting);


        //orgId of logged in user
        var trainingOrgID = utilsService.getOrganization();

        //flag to validate landing tab in create trainings flow
        var trainingLandingDetailsValidate = null;
        //flag to validate pricing tab in create trainings flow
        var trainingPricingDetailsValidate = null;
        //flag to validate curriculum tab in create trainings flow
        var trainingCurriculumValidate = null;
        //flag to validate advanced tab in create trainings flow
        var trainingAdvancedDetailsValidate = null;

        var createTrainingFlag = '';

        var trainingSaveDraftEnable = null;
        self.hideSidebarSection = {
            flag: false
        };
        //to get training model
        function getTrainingModel() {
            return trainingModel;
        }

        function getShareSetting() {
            return shareSetting;
        }
        //to hide sidebar and nav menu in create training flow
        function hideSidebar(value) {
            self.hideSidebarSection.flag = value;
            //return hideSidebarSection.flag;
        }

        //to get flag to validate basic details tab in create trainings flow
        function getTrainingLandingDetailsValidate() {
            return trainingLandingDetailsValidate;
        }

        //to set flag to validate basic details tab in create trainings flow
        function setTrainingLandingDetailsValidate(flag) {
            trainingLandingDetailsValidate = flag;
        }

        //to get flag to validate cloud account tab in create trainings flow
        function getTrainingCurriculumDetailsValidate() {
            return trainingCurriculumValidate;
        }

        //to set flag to validate cloud account tab in create trainings flow
        function setTrainingCurriculumDetailsValidate(flag) {
            trainingCurriculumValidate = flag;
        }

        //to get flag to validate project details tab in create trainings flow
        function getTrainingPricingDetailsValidate() {
            return trainingPricingDetailsValidate;
        }

        //to set flag to validate project details tab in create trainings flow
        function setTrainingPricingDetailsValidate(flag) {
            trainingPricingDetailsValidate = flag;
        }

        //to get flag to validate advance details tab in create trainings flow
        function getTrainingAdvancedDetailsValidate() {
            return trainingAdvancedDetailsValidate;
        }

        //to set flag to validate advance details tab in create trainings flow
        function setTrainingAdvancedDetailsValidate(flag) {
            trainingAdvancedDetailsValidate = flag;
        }
        //to reset all variables
        function resetAll() {
            trainingModel = angular.copy(trainings);
            trainingLandingDetailsValidate = null;
            trainingAdvancedDetailsValidate = null;
            trainingCurriculumValidate = null;
            trainingPricingDetailsValidate = null;
            trainingSaveDraftEnable = null;
        }

        //to get create training flag
        function getCreateTrainingFlag() {
            return createTrainingFlag;
        }

        //to set create training flag
        function setCreateTrainingFlag(value) {
            createTrainingFlag = value;
        }

        return {
            getTrainingLandingDetailsValidate: getTrainingLandingDetailsValidate,
            setTrainingLandingDetailsValidate: setTrainingLandingDetailsValidate,
            getTrainingCurriculumDetailsValidate: getTrainingCurriculumDetailsValidate,
            setTrainingCurriculumDetailsValidate: setTrainingCurriculumDetailsValidate,
            getTrainingPricingDetailsValidate: getTrainingPricingDetailsValidate,
            setTrainingPricingDetailsValidate: setTrainingPricingDetailsValidate,
            getTrainingAdvancedDetailsValidate: getTrainingAdvancedDetailsValidate,
            setTrainingAdvancedDetailsValidate: setTrainingAdvancedDetailsValidate,
            getTrainingModel: getTrainingModel,
            resetAll: resetAll,
            hideSidebar: hideSidebar,
            hideSidebarSection: self.hideSidebarSection,
            getCreateTrainingFlag: getCreateTrainingFlag,
            setCreateTrainingFlag: setCreateTrainingFlag,
            getShareSetting: getShareSetting
        }

    }
})();