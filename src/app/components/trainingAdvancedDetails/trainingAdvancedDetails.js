(function() {
    'use strict';

    angular.module('veegam-trials').component('trainingAdvancedDetails', {
        controller: TrainingAdvancedDetailsController,
        controllerAs: 'vm',
        templateUrl: 'app/components/trainingAdvancedDetails/trainingAdvancedDetails.view.html',
    });

    /** @ngInject */
    TrainingAdvancedDetailsController.$inject = ['$scope', '$element', '$state', 'trainingsSvc', 'trainings', '$rootScope', 'uploadDataSvc', 'Guid', 'errorSvc', 'customDialog', '$anchorScroll'];

    function TrainingAdvancedDetailsController($scope, $element, $state, trainingsSvc, trainings, $rootScope, uploadDataSvc, Guid, errorSvc, customDialog, $anchorScroll) {
        var vm = this;
        vm.trainingsModel = trainingsSvc.getTrainingModel().trainings;
        vm.projectList = angular.copy(trainings.projectList);
        // default demo lab deployment time type set to soft lab
        vm.trainingsModel.configuration.deploymentTimeType = 'softlab';
        vm.sharingSettingsObj = trainingsSvc.getTrainingModel().sharingSettingsObj;

        vm.showCreateTrainingLoading = false;
        vm.fileurl = {};
        vm.createTrainingFg = '';
        vm.categoryToRemove = {};
        vm.coAuthorToRemove = {};
        //Array to fill dropdown of type of documents user can upload
        vm.trainingSelectedFileType = '';
        vm.dropdownIsOpen = false;
        vm.trainingUploadType = '';

        //variable to change tab inner section
        vm.scrollAnchor = 'training_adv_configuration';
        vm.trainingAdvConfigValid = null;
        vm.trainingAdvLinkCloudAccValid = null;
        vm.trainingAdvShareSettingsValid = null;
        vm.trainingAdvProjDetailsValid = null;
        vm.currentSelectedTabAdvDetails = vm.scrollAnchor;

        vm.associatedProjectList = [];

        vm.cloudPool = [{
                id: 'amazoncloud',
                name: 'Amazon Cloud Services',
                accountAttached: 100
            },
            {
                id: 'oraclecloud',
                name: 'Oracle Cloud Services',
                accountAttached: 100
            },
            {
                id: 'azurecloud',
                name: 'Azure Cloud Services',
                accountAttached: 100
            }
        ]

        function getTrainingLandingInfo() {
            vm.createTrainingFg = trainingsSvc.getCreateTrainingFlag();
        }
        getTrainingLandingInfo();

        // function to display the projects associted with the section of particular training lab
        function filterSectionProjects() {
            _.each(vm.trainingsModel.sections, function(section) {
                var matchProject = _.filter(vm.projectList, function(project) {
                    return project.project_id === section.project.projectInfo.project_id;
                })
                if (matchProject.length > 0) {
                    vm.associatedProjectList.push({
                        title: section.title,
                        projectId: matchProject[0].project_id,
                        projectName: matchProject[0].projectName,
                        type: matchProject[0].projectType
                    })
                }
            })
        }
        filterSectionProjects();

        vm.helpSection = function(value) {
            $rootScope.$broadcast('trainingHelpSection', value);
        }

        //Function for got to anchor
        vm.goToAnchor = function(anchor) {
            if (vm.currentSelectedTabAdvDetails == 'training_adv_configuration') {
                if (vm.trainingsModel.configuration.duration && vm.trainingsModel.configuration.duration !== '' && vm.trainingsModel.configuration.deploymentTime && vm.trainingsModel.configuration.deploymentTime !== '' && vm.trainingsModel.configuration.concurrencyLimit && vm.trainingsModel.configuration.concurrencyLimit !== '' && vm.trainingsModel.configuration.perUserLimit && vm.trainingsModel.configuration.perUserLimit !== '' && vm.trainingsModel.streams && vm.trainingsModel.streams !== '') {
                    vm.trainingAdvConfigValid = true;
                } else {
                    vm.trainingAdvConfigValid = false;
                }
            } else if (vm.currentSelectedTabAdvDetails == 'training_adv_link_cloud') {
                if (vm.trainingsModel.icons && vm.trainingsModel.icons.length !== 0 && vm.trainingsModel.labImage.baseURL && vm.trainingsModel.labImage.baseURL !== '') {
                    vm.trainingAdvLinkCloudAccValid = true;
                } else {
                    vm.trainingAdvLinkCloudAccValid = false;
                }
            } else if (vm.currentSelectedTabAdvDetails == 'training_adv_share_settings') {
                if (vm.trainingsModel.usermanual && vm.trainingsModel.usermanual.length !== 0 && vm.trainingsModel.videos && vm.trainingsModel.videos.length !== 0) {
                    vm.trainingAdvShareSettingsValid = true;
                } else {
                    vm.trainingAdvShareSettingsValid = false;
                }
            } else if (vm.currentSelectedTabAdvDetails == 'training_adv_proj') {
                if (vm.trainingsModel.usermanual && vm.trainingsModel.usermanual.length !== 0 && vm.trainingsModel.videos && vm.trainingsModel.videos.length !== 0) {
                    vm.trainingAdvProjDetailsValid = true;
                } else {
                    vm.trainingAdvProjDetailsValid = false;
                }
            }
            vm.currentSelectedTabAdvDetails = anchor;
            vm.scrollAnchor = anchor;
        }

        //Function to get the class of training configuration

        vm.getTrainingConfigurationClass = function() {
            if (vm.scrollAnchor === 'training_adv_configuration') {
                if (vm.trainingAdvConfigValid === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }

            } else if (vm.scrollAnchor !== 'training_adv_configuration' && vm.trainingAdvConfigValid === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_adv_configuration' && vm.trainingAdvConfigValid === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_adv_configuration' && vm.trainingAdvConfigValid === true) {
                return 'trial_step_valid';
            }
        }

        //Function to get the class of training link cloud account

        vm.getTrainingCloudAccountClass = function() {
            if (vm.scrollAnchor === 'training_adv_link_cloud') {
                if (vm.trainingAdvLinkCloudAccValid === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }

            } else if (vm.scrollAnchor !== 'training_adv_link_cloud' && vm.trainingAdvLinkCloudAccValid === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_adv_link_cloud' && vm.trainingAdvLinkCloudAccValid === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_adv_link_cloud' && vm.trainingAdvLinkCloudAccValid === true) {
                return 'trial_step_valid';
            }
        }

        //Function to get the class of training share settings

        vm.getTrainingShareSettingsClass = function() {
            if (vm.scrollAnchor === 'training_adv_share_settings') {
                if (vm.trainingAdvShareSettingsValid === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }

            } else if (vm.scrollAnchor !== 'training_adv_share_settings' && vm.trainingAdvShareSettingsValid === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_adv_share_settings' && vm.trainingAdvShareSettingsValid === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_adv_share_settings' && vm.trainingAdvShareSettingsValid === true) {
                return 'trial_step_valid';
            }
        }

        //Function to get the class of training Project Details

        vm.getTrainingProjDetailsClass = function() {
            if (vm.scrollAnchor === 'training_adv_proj') {
                if (vm.trainingAdvProjDetailsValid === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }

            } else if (vm.scrollAnchor !== 'training_adv_proj' && vm.trainingAdvProjDetailsValid === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_adv_proj' && vm.trainingAdvProjDetailsValid === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_adv_proj' && vm.trainingAdvProjDetailsValid === true) {
                return 'trial_step_valid';
            }
        }

        // for share setting
        vm.currentNavItem = 'Users';
        $scope.permissionList = [{
                name: 'Admin',
                des: 'Can View, Update or Delete Demo Lab configuration',
                id: 'admin'
            },
            {
                name: 'Read/Write',
                des: 'Can View, Update Demo Lab configuration',
                id: 'readWrite'
            },
            {
                name: 'ReadOnly',
                des: 'Can View Demo Lab Configuration',
                id: 'readOnly'
            },
            {
                name: 'Green List',
                des: 'Can View and Launch a Demo Lab without restrictions',
                id: 'greenLaunch'
            },
            {
                name: 'Red List',
                des: 'Can View, Cannot Launch a Demo Lab',
                id: 'deny'
            }
        ];

        //add item to collection
        $scope.addItemToItemGroup = function(type) {
            var item;
            switch (type) {
                case 'user':
                    vm.sharingSettingsObj.user.orgID = 'Sysgain'; // for the Alpha release only. Need to remove it in future
                    item = _.filter(vm.trainingsModel.permissions.sharedWith, function(item) {
                        return (item.value === (vm.sharingSettingsObj.user.selectedUser + ':' + vm.sharingSettingsObj.user.orgID));
                    })
                    if (item.length === 0) {
                        vm.trainingsModel.permissions.sharedWith.push({
                            type: 'user',
                            value: vm.sharingSettingsObj.user.selectedUser + ':' + vm.sharingSettingsObj.user.orgID,
                            policy: $scope.permissionList[0].id
                        })
                    }
                    vm.sharingSettingsObj.user.selectedUser = '';
                    break;

                case 'team':
                    item = _.filter(vm.trainingsModel.permissions.sharedWith, function(item) {
                        return (item.value === (vm.sharingSettingsObj.team.selectedTeam + ':' + vm.sharingSettingsObj.team.orgName));
                    })
                    if (item.length === 0) {
                        vm.trainingsModel.permissions.sharedWith.push({
                            type: 'team',
                            value: vm.sharingSettingsObj.team.selectedTeam + ':' + vm.sharingSettingsObj.team.orgName,
                            policy: $scope.permissionList[2].id
                        })
                    }
                    vm.sharingSettingsObj.team.selectedTeam = '';
                    break;

                case 'organization':
                    item = _.filter(vm.trainingsModel.permissions.sharedWith, function(item) {
                        return (item.value === vm.sharingSettingsObj.organizations.selectedOrganization);
                    })
                    if (item.length === 0) {
                        vm.trainingsModel.permissions.sharedWith.push({
                            type: 'organization',
                            value: vm.sharingSettingsObj.organizations.selectedOrganization,
                            policy: $scope.permissionList[2].id
                        })
                    }
                    vm.sharingSettingsObj.organizations.selectedOrganization = '';
                    break;

                case 'email':
                    var item = _.filter(vm.trainingsModel.permissions.sharedWith, function(item) {
                        return (item.value === vm.sharingSettingsObj.email.selectedEmail);
                    })
                    if (item.length === 0) {
                        vm.trainingsModel.permissions.sharedWith.push({
                            type: 'email',
                            value: vm.sharingSettingsObj.email.selectedEmail,
                            policy: $scope.permissionList[0].id
                        })
                    }
                    vm.sharingSettingsObj.email.selectedEmail = '';
                    break;

                case 'domain':
                    item = _.filter(vm.trainingsModel.permissions.sharedWith, function(item) {
                        return (item.value === vm.sharingSettingsObj.emailDomain.domain);
                    })
                    if (item.length === 0) {
                        vm.trainingsModel.permissions.sharedWith.push({
                            type: 'domain',
                            value: vm.sharingSettingsObj.emailDomain.domain,
                            policy: $scope.permissionList[0].id
                        })
                    }
                    vm.sharingSettingsObj.emailDomain.domain = '';
                    break;
            }
            console.log(vm.trainingsModel.permissions);
        }

        //delete item from collection
        $scope.deleteSavedItem = function(data) {
            vm.trainingsModel.permissions.sharedWith = vm.trainingsModel.permissions.sharedWith.filter(function(obj) {
                return (
                    obj.value !== data.value);
            });
            // $scope.public = !$scope.public;
        }

    }
})();