(function() {
    'use strict';

    angular.module('veegam-trials').component('project', {
        controller: ProjectController,
        controllerAs: 'vm',
        templateUrl: 'app/components/project/project.html',
    });

    /** @ngInject */
    ProjectController.$inject = ['$scope', '$rootScope', 'projects', 'projectsSvc', '$timeout', 'errorSvc', '$mdDialog', '$mdToast', '$element'];

    function ProjectController($scope, $rootScope, projects, projectsSvc, $timeout, errorSvc, $mdDialog, $mdToast, $element) {
        var vm = this;
        vm.showProjectLoading = false;
        //Store details of selected project from list of already created projects
        vm.projectDetailsObj = {};

        //Store details of new project to be created
        if (!vm.projectDetailsObj.newProject)
            vm.projectDetailsObj.newProject = {};

        //flag to show/hide tooltip when new project is created and added to list of already created projects
        vm.showProjectCreatedTooltip = false;

        // Get projects by orgID
        function getProjectbyID() {
            vm.showProjectLoading = true;
            projectsSvc.getProjectByOrgID().then(function(response) {
                vm.projectDetailsObj.savedProjects = [];
                vm.projectDetailsObj.savedProjects = response.data;
                // if ($scope.projectId) {
                //     var projById = _.filter($scope.projectDetailsObj.savedProjects, function(item) {
                //         return item.project_id === $scope.projectId;
                //     })[0];

                //     $scope.projectDetailsObj.selectedProject = projById;
                // }
                vm.showProjectLoading = false;
            }, function(error) {
                console.log(error);
                vm.showProjectLoading = false;
                if (error.data != undefined) {
                    errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                }
                errorSvc.logProcessing(error, 'error');
            });
        }
        getProjectbyID();

        // Method to show options overlay for a card
        vm.showTrialOptions = function(obj) {
            _.each(vm.projectDetailsObj.savedProjects, function(projectData) {
                projectData.trialOptions = false;
                projectData.deleteDemoLabFlag = false;
            });
            obj.trialOptions = true;
        }

        // Method to hide options overlay for a card
        vm.hideTrialOptions = function(obj) {
            obj.trialOptions = false;
        }

        // Method to show confirm delete overlay for a particular Demo Lab
        vm.showConfirmDelete = function(project) {
            project.deleteDemoLabFlag = true;
        }

        vm.deleteDemoLabAction = function(project, flag) {
            if (flag) {
                // vm.showProjectLoading = true;
                projectsSvc.deleteProjectByOrg(project.orgId, project.project_id).then(function(response) {
                    if (response) {
                        getProjectbyID();
                    }
                }, function(error) {
                    console.log(error);
                });
            } else {
                project.deleteDemoLabFlag = false;
                project.trialOptions = false;
            }
        }

        // Method to open create new project modal
        vm.openCreateProjectDialog = function(ev, mode) {
            projects.projectResponse = ev;
            localStorage.setItem('ProjectMode', mode);
            angular.element(document.body).addClass("custom_dialog_body");
            console.log(ev);
            $mdDialog.show({
                    template: '<create-project></create-project>',
                    parent: angular.element(document.querySelector('.parent-trial'))
                })
                .then(function(response) {
                    // console.log('success');
                    if (response) {
                        // vm.showProjectLoading = true;
                        getProjectbyID();
                    }
                }, function(error) {
                    console.log(error);
                });
        };

    }

})();