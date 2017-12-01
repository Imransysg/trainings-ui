(function() {
    'use strict';

    angular.module('veegam-trials').component('createProject', {
        controller: CreateProjectController,
        controllerAs: 'vm',
        templateUrl: 'app/components/createProject/createProject.html',
    });

    /** @ngInject */
    function CreateProjectController($scope, $mdDialog, $element, $timeout, $rootScope, uploadDataSvc, Guid, errorSvc, customDialog, projects, projectsSvc, utilsService) {
        var vm = this;
        //create instance of projectCreate from projects model
        vm.projectCreate = angular.copy(projects.projectCreate);
        vm.projectCreate.terraformVersion = 'latest';
        //create instance of gitProjectDetails from projects model
        vm.gitProjectDetails = angular.copy(projects.gitProjectDetails);
        //create instance of zipProjectDetails from projects model
        vm.zipProjectDetails = angular.copy(projects.zipProjectDetails);
        vm.orgID = utilsService.getOrganization();
        vm.projectMode = localStorage.getItem('ProjectMode');
        localStorage.removeItem('ProjectMode');
        vm.currentProject = {};
        if (projects.projectResponse) {
            vm.currentProject = projects.projectResponse;
            vm.projectCreate = {
                projectName: projects.projectResponse.projectName,
                projectDescription: projects.projectResponse.projectDescription,
                terraformVersion: 'latest',
                projectType: projects.projectResponse.projectType,
                projectDetails: projects.projectResponse.projectDetails,
            }
            if (vm.projectCreate.projectType === 'zip') {
                vm.zipProjectDetails = vm.projectCreate.projectDetails;
            } else if (vm.projectCreate.projectType === 'github') {
                vm.gitProjectDetails = vm.projectCreate.projectDetails;
            }
        }


        //Method call to create new project
        vm.createProject = function() {
            if (vm.projectCreate.projectType == 'github') {
                vm.projectCreate.projectDetails = vm.gitProjectDetails;
            } else {
                vm.projectCreate.projectDetails = vm.zipProjectDetails;
            }
            vm.showProjectLoading = true;
            // projectSvc call to save project data
            projectsSvc.createProjectByOrg(vm.projectCreate).then(function(response) {
                //get project_id in response
                vm.showProjectLoading = false;
                var tmpProjId = response.data.project_id;
                $mdDialog.hide({
                    projectId: tmpProjId,
                    flag: 'true'
                });
            }, function(error) {
                vm.showProjectLoading = false;
                if (error.status == 401 && error.data) {
                    errorSvc.displayErrorString('labs-service_7', 'error', 5);
                } else {
                    console.log('error createProjectByOrg');
                    if (error.data != undefined) {
                        errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                    }
                }
                errorSvc.logProcessing(error, 'error');
            });
        }

        //Method call to update project
        vm.updateProject = function() {
            if (vm.projectCreate.projectType == 'github') {
                vm.projectCreate.projectDetails = vm.gitProjectDetails;
            } else {
                vm.projectCreate.projectDetails = vm.zipProjectDetails;
            }
            vm.showProjectLoading = true;
            // projectSvc call to save project data
            var updateProjectValue = {
                orgId: projects.projectResponse.orgId,
                project_id: projects.projectResponse.project_id,
                Projects: vm.projectCreate
            }
            projectsSvc.updateProjectByOrg(updateProjectValue.orgId, updateProjectValue).then(function(response) {
                //get project_id in response
                var tmpProjId = response.data.project_id;
                $mdDialog.hide({
                    projectId: tmpProjId,
                    flag: 'true'
                });
            }, function(error) {
                vm.showProjectLoading = false;
                if (error.status == 401 && error.data) {
                    errorSvc.displayErrorString('labs-service_7', 'error', 5);
                } else {
                    console.log('error createProjectByOrg');
                    if (error.data != undefined) {
                        errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                    }
                }
                errorSvc.logProcessing(error, 'error');
            });
        }

        // Method to delete the project
        // Method to show confirm delete overlay for a particular Demo Lab
        vm.showConfirmDelete = function(project) {
            project.deleteDemoLabFlag = true;
        }

        vm.deleteProject = function() {
            vm.showProjectLoading = true;
            projectsSvc.deleteProjectByOrg(vm.currentProject.orgId, vm.currentProject.project_id).then(function(response) {
                if (response) {
                    vm.confirmYes('true');
                }
            }, function(error) {
                console.log(error);
                vm.confirmYes('true');
            });
        }

        // enable/disable create project button
        vm.getCreateProjectValidity = function() {
            if (vm.projectCreate.projectType == 'github' && vm.projectCreate.projectName && vm.projectCreate.projectName !== "" && vm.projectCreate.projectDescription && vm.projectCreate.projectDescription !== "" && vm.projectCreate.terraformVersion && vm.projectCreate.terraformVersion !== "" && vm.gitProjectDetails.githubAccountName && vm.gitProjectDetails.githubAccountName !== "" && vm.gitProjectDetails.githubRepoName && vm.gitProjectDetails.githubRepoName !== "" && vm.gitProjectDetails.githubRepoBranch && vm.gitProjectDetails.githubRepoBranch !== "") {
                return false;
            } else if (vm.projectCreate.projectType == 'zip' && vm.projectCreate.projectName && vm.projectCreate.projectName !== "" && vm.projectCreate.projectDescription && vm.projectCreate.projectDescription !== "" && vm.projectCreate.terraformVersion && vm.projectCreate.terraformVersion !== "" && vm.zipProjectDetails.title) {
                return false;
            } else {
                return true;
            }
        }



        //Method call to upload Zip for creation of new project
        vm.uploadProjectZip = function(e) {
            if (vm.zipProjectDetails.title) {
                vm.removeZip();
            }
            vm.showProjectLoading = true;
            if (e.files[0].type == "" || e.files[0].type == "application/x-gzip" || e.files[0].type == "application/x-tar" || e.files[0].type == "application/x-zip-compressed" || e.files[0].type == "application/x-rar-compressed" || e.files[0].type == "application/zip" || e.files[0].type == "application/octet-stream" || e.files[0].type == ".7z" || e.files[0].type == ".rar") {
                var reader = new FileReader();
                var orginalName = e.files[0].name;
                var nameArr = e.files[0].name.split('.');
                var fileName = Guid.newGuid() + "." + nameArr[nameArr.length - 1];
                var type = e.files[0].type;
                reader.onload = (function(filename, orginalName, type) {
                    // var data = reader.result;
                    return function(loadEvent) {
                        uploadDataSvc.uploadData(loadEvent.target.result, fileName, type).then(function(response) {
                            vm.showProjectLoading = false;
                            console.log('file uploaded successfully');
                            vm.zipProjectDetails.title = orginalName;
                            vm.zipProjectDetails.url = '';
                            //this will add once we retrieve url from api
                            vm.zipProjectDetails.id = fileName;
                        }, function(error) {
                            vm.showProjectLoading = false;
                            console.log('file uploaded failed');
                            if (error.data != undefined) {
                                errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                            }
                            errorSvc.logProcessing(error, 'error');
                        });
                    }
                })(fileName, orginalName, type);
                reader.readAsArrayBuffer(e.files[0]);
            } else {
                // if(error.data!=undefined)
                vm.showProjectLoading = false;
                errorSvc.displayErrorString('ui-errors_8', 'error', 15);
            }
        }



        vm.cancel = function(message, flag) {
            var objCustomDialog = angular.copy(customDialog.dialog);
            objCustomDialog.message = message;
            objCustomDialog.buttons = [{
                    text: 'Yes',
                    iconText: 'check_circle',
                    callback: flag === 'discard_changes' ? vm.resetform : vm.deleteProject
                },
                {
                    text: 'No',
                    iconText: 'cancel',
                    callback: vm.confirmNo
                }
            ];
            errorSvc.displayConfirmation(objCustomDialog);
        };
        vm.confirmYes = function(value) {
            errorSvc.closeToastr();
            $mdDialog.hide(value);
        }
        vm.confirmNo = function() {
            errorSvc.closeToastr();
        }

        //Function to reset create new project form to original
        vm.resetform = function() {
            vm.gitProjectDetails = angular.copy(projects.gitProjectDetails);
            vm.zipProjectDetails = angular.copy(projects.zipProjectDetails);
            vm.projectCreate = angular.copy(projects.projectCreate);
            if ($scope.newProjectForm) {
                $scope.newProjectForm.$setPristine(true);
                $scope.newProjectForm.$setUntouched();
            }
            vm.confirmYes('true');
        }

        //Function to delete Zip selected for creation of new project
        vm.removeZip = function() {
            vm.zipProjectDetails = angular.copy(projects.zipProjectDetails);
        }

        //Function to reset create new project with github details form to original
        vm.clearProjectGithubDet = function() {
            vm.gitProjectDetails = angular.copy(projects.gitProjectDetails);
            $scope.newProjectForm.gitAccountName.$setUntouched();
            $scope.newProjectForm.repo.$setUntouched();
            $scope.newProjectForm.branch.$setUntouched();
        }

        vm.editProject = function() {
            vm.projectMode = 'editable';
        }
    }
})();