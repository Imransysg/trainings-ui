(function() {
    'use strict';

    angular.module('veegam-trials').directive('projectDetails', ['uploadDataSvc', 'Guid', function(uploadDataSvc, Guid) {
        return {
            restrice: 'AE',
            templateUrl: 'app/directives/projectDetails/projectDetails.view.html',
            scope: {
                projectDetailsObj: "=projectDetailsObj",
                projectId: "=projectId"
            },
            controller: function ($scope, $rootScope, createTrialService, projects, projectsSvc, $timeout, errorSvc, stacksSvc) {

                //create instance of projectCreate from projects model
                $scope.projectCreate = angular.copy(projects.projectCreate);
                $scope.projectCreate.terraformVersion = 'latest';
                //create instance of gitProjectDetails from projects model
                $scope.gitProjectDetails = angular.copy(projects.gitProjectDetails);
                //create instance of zipProjectDetails from projects model
                $scope.zipProjectDetails = angular.copy(projects.zipProjectDetails);
                //flag to show/hide spinner when all created projects are loaded
                $scope.showProjectLoading = true;
                //Store details of selected project from list of already created projects
                $scope.projectDetails = {};

                //Store details of new project to be created
                if (!$scope.projectDetailsObj.newProject)
                    $scope.projectDetailsObj.newProject = {};

                //flag to show/hide tooltip when new project is created and added to list of already created projects
                $scope.showProjectCreatedTooltip = false;

                // Get projects by orgID
                projectsSvc.getProjectByOrgID().then(function(response) {
                    $scope.projectDetailsObj.savedProjects = [];
                    $scope.projectDetailsObj.savedProjects = response.data;
                    if ($scope.projectId) {
                        var projById = _.filter($scope.projectDetailsObj.savedProjects, function(item) {
                            return item.project_id === $scope.projectId;
                        })[0];
                        //select project based on ID above. pass project_id to demolabs model.
                        $scope.projectDetailsObj.selectedProject = projById;
                    }
                    $scope.showProjectLoading = false;
                }, function(error) {
                    console.log(error);
                    $scope.showProjectLoading = false;
                    if (error.data != undefined) {
                        errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                    }
                    errorSvc.logProcessing(error, 'error');
                });

                /*** Create filter function for a query string */
                function createFilterFor(query, type) {
                    var lowercaseQuery = angular.lowercase(query);

                    switch (type) {
                        case 'project':
                            return function filterFn(project) {
                                var toCompare = project.projectName.toLowerCase();
                                return (toCompare.indexOf(lowercaseQuery) !== -1);
                            };
                        case 'repo':
                            return function filterFn(repo) {
                                var toCompare = repo.name.toLowerCase();
                                return (toCompare.indexOf(lowercaseQuery) !== -1);
                            };
                        case 'branch':
                            return function filterFn(branch) {
                                var toCompare = branch.name.toLowerCase();
                                return (toCompare.indexOf(lowercaseQuery) !== -1);
                            };
                        case 'folder':
                            return function filterFn(folder) {
                                var toCompare = folder.name.toLowerCase();
                                return (toCompare.indexOf(lowercaseQuery) !== -1);
                            };
                    }
                }

                //Return filtered projects based on query
                $scope.querySearchProject = function(query) {
                    var results = query ? $scope.projectDetailsObj.savedProjects.filter(createFilterFor(query, 'project')) : $scope.projectDetailsObj.savedProjects,
                        deferred;
                    return results;
                }

                //Function when search Text is changed
                $scope.searchTextChange = function(text) {
                    console.log('Text changed to ' + text);
                }

                //Function when selected item is changed
                $scope.selectedItemChange = function(item) {
                    console.log('Item changed to ' + JSON.stringify(item));
                }

                //Function to create new project
                $scope.createProject = function() {
                    if ($scope.projectCreate.projectType == 'github') {
                        $scope.projectCreate.projectDetails = $scope.gitProjectDetails;
                    } else {
                        $scope.projectCreate.projectDetails = $scope.zipProjectDetails;
                    }
                    $scope.showProjectLoading = true;
                    // projectSvc call to save project data
                    projectsSvc.createProjectByOrg($scope.projectCreate).then(function(response) {
                        //get project_id in response
                        var tmpProjId = response.data.project_id;
                        // call API to Get all projects and select based on project_id above.
                        projectsSvc.getProjectByOrgID().then(function(response) {
                            $scope.showProjectLoading = false;
                            $scope.projectDetailsObj.savedProjects = response.data;
                            var projById = _.filter($scope.projectDetailsObj.savedProjects, function(item) {
                                return item.project_id === tmpProjId;
                            })[0];
                            //select project based on ID above. pass project_id to demolabs model.
                            $scope.projectDetailsObj.selectedProject = projById;
                            $scope.projectId = projById.project_id;
                            $scope.showProjectCreatedTooltip = true;
                            $timeout(function() {
                                $scope.showProjectCreatedTooltip = false;
                            }, 5000);
                            $scope.resetform();
                        }, function(error) {
                            $scope.showProjectLoading = false;
                            console.log(error);
                            if (error.data != undefined) {
                                errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                            }
                            errorSvc.logProcessing(error, 'error');
                        });

                    }, function(error) {
                        $scope.showProjectLoading = false;
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

                //Function to reset create new project form to original
                $scope.resetform = function() {
                    $scope.gitProjectDetails = angular.copy(projects.gitProjectDetails);
                    $scope.zipProjectDetails = angular.copy(projects.zipProjectDetails);
                    $scope.projectCreate = angular.copy(projects.projectCreate);
                    if ($scope.newProjectForm) {
                        $scope.newProjectForm.$setPristine(true);
                        $scope.newProjectForm.$setUntouched();
                    }
                }

                // enable/disable create project button
                $scope.getCreateProjectValidity = function() {
                    if ($scope.projectCreate.projectType == 'github' && !$scope.newProjectForm.$pristine && $scope.projectCreate.projectName && $scope.projectCreate.projectName !== "" && $scope.projectCreate.projectDescription && $scope.projectCreate.projectDescription !== "" && $scope.projectCreate.terraformVersion && $scope.projectCreate.terraformVersion !== "" && $scope.gitProjectDetails.githubAccountName && $scope.gitProjectDetails.githubAccountName !== "" && $scope.gitProjectDetails.githubRepoName && $scope.gitProjectDetails.githubRepoName !== "" && $scope.gitProjectDetails.githubRepoBranch && $scope.gitProjectDetails.githubRepoBranch !== "") {
                        return false;
                    } else if ($scope.projectCreate.projectType == 'zip' && !$scope.newProjectForm.$pristine && $scope.projectCreate.projectName && $scope.projectCreate.projectName !== "" && $scope.projectCreate.projectDescription && $scope.projectCreate.projectDescription !== "" && $scope.projectCreate.terraformVersion && $scope.projectCreate.terraformVersion !== "" && $scope.zipProjectDetails.title) {
                        return false;
                    } else {
                        return true;
                    }
                }

                //set flag to validate project details tab on create demo lab screen
                function setProjectValidateFlag() {
                    if ($scope.projectDetailsObj.currentPage === 4 && $scope.projectDetailsObj.creationType === 'demoLab') {
                        if ($scope.projectDetailsObj.selectedProject !== null && $scope.projectDetailsObj.selectedProject !== undefined) {
                            createTrialService.setProjectDetailsValidate(true);
                        } else {
                            createTrialService.setProjectDetailsValidate(false);
                        }
                    }
                    else if ($scope.projectDetailsObj.currentPage === 3 && $scope.projectDetailsObj.creationType === 'stacks') {
                        if ($scope.projectDetailsObj.selectedProject !== null && $scope.projectDetailsObj.selectedProject !== undefined) {
                            stacksSvc.setStackProjectDetailsValidate(true);
                        } else {
                            stacksSvc.setStackProjectDetailsValidate(false);
                        }
                    }
                }

                setProjectValidateFlag();

                //function called when any project is selected from list of already created projects
                $scope.selectedItemChangeProject = function(item) {
                    if (item) {
                        $scope.projectDetailsObj.selectedProject = item;
                        $scope.projectId = item.project_id;
                        setProjectValidateFlag();
                    }
                }

                //Function to upload Zip for creation of new project
                $scope.uploadProjectZip = function(e) {
                    if ($scope.zipProjectDetails.title) {
                        $scope.removeZip();
                    }
                    $scope.showProjectLoading = true;
                    if (e.files[0].type == "" || e.files[0].type == "application/x-gzip" || e.files[0].type == "application/x-tar" || e.files[0].type == "application/x-zip-compressed" || e.files[0].type == "application/x-rar-compressed" || e.files[0].type == "application/zip" || e.files[0].type == "application/octet-stream" || e.files[0].type == ".7z" || e.files[0].type == ".rar") {
                        var reader = new FileReader();
                        var orginalName = e.files[0].name;
                        var nameArr = e.files[0].name.split('.');
                        var fileName = Guid.newGuid() + "." + nameArr[nameArr.length - 1];
                        var type = e.files[0].type;
                        reader.onload = (function(filename, orginalName, type) {
                            // var data = reader.result;
                            return function(loadEvent) {
                                uploadDataSvc.uploadData(loadEvent.target.result, fileName, type).then(function() {
                                    $scope.showProjectLoading = false;
                                    console.log('file uploaded successfully');
                                    $scope.zipProjectDetails.title = orginalName;
                                    $scope.zipProjectDetails.url = '';
                                    //this will add once we retrieve url from api
                                    $scope.zipProjectDetails.id = fileName;
                                }, function(error) {
                                    $scope.showProjectLoading = false;
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
                        $scope.showProjectLoading = false;
                        errorSvc.displayErrorString('ui-errors_8', 'error', 15);
                    }
                }

                //Function to delete Zip selected for creation of new project
                $scope.removeZip = function() {
                    $scope.zipProjectDetails = angular.copy(projects.zipProjectDetails);
                }

                //Function to reset create new project with github details form to original
                $scope.clearProjectGithubDet = function() {
                    $scope.gitProjectDetails = angular.copy(projects.gitProjectDetails);
                    $scope.newProjectForm.gitAccountName.$setUntouched();
                    $scope.newProjectForm.repo.$setUntouched();
                    $scope.newProjectForm.branch.$setUntouched();
                }

                //function to open help section of project details
                $scope.helpSection = function(value) {
                    $rootScope.$broadcast('helpSection', value);
                }

            }
        };
    }])
})();