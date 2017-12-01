(function() {
    'use strict';

    angular.module('veegam-trials').component('trainingLabCurriculum', {
        controller: TrainingLabCurriculumController,
        controllerAs: 'vm',
        templateUrl: 'app/components/trainingLabCurriculum/trainingLabCurriculum.view.html',
    });

    /** @ngInject */
    TrainingLabCurriculumController.$inject = ['$scope', '$element', '$state', 'trainingsSvc', 'trainings', '$rootScope', 'uploadDataSvc', 'Guid', 'errorSvc', 'customDialog', 'projectsSvc', '$mdDialog', 'Auth0_Extend_HostURL', 'Auth0_Extend_Container', 'Auth0_Extend_Token'];

    function TrainingLabCurriculumController($scope, $element, $state, trainingsSvc, trainings, $rootScope, uploadDataSvc, Guid, errorSvc, customDialog, projectsSvc, $mdDialog, Auth0_Extend_HostURL, Auth0_Extend_Container, Auth0_Extend_Token) {
        var vm = this;
        $element.addClass('display-block height100');
        vm.trainingsModel = trainingsSvc.getTrainingModel().trainings;
        vm.contentSteps = angular.copy(trainings.contentSteps);
        vm.selectedVariable = '';
        vm.stepContentType = '';
        vm.FlagForDelete = '';
        vm.currentSectionCategory = '';
        vm.disableInkBar = true;
        vm.hooks = [{
                hookID: Guid.newGuid()
            }]
            //Stack basic details accordion variables
        vm.sectionAvaliableList = ['Welcome', 'Content', 'Hook', 'Feedback', 'Poll', 'Quiz'];
        vm.projectDetailsObj = {};
        vm.step = {
            contentSel: '',
            contentDes: '',
            contentOption: [{
                id: 'htmlEditor',
                value: 'Html Editor'
            }, {
                id: 'markdownEditor',
                value: 'Markdown Editor'
            }, {
                id: 'uploadImagesVideo',
                value: 'Upload Images Video'
            }]
        }
        var stepCopy = angular.copy(vm.step);
        stepCopy.contentSel = 'htmlEditor'
        vm.stepList = [vm.contentSteps];

        // vm.helpSection = function(value) {
        //     $rootScope.$broadcast('trainingHelpSection', value);
        // }

        // retrieve the project list 
        function getProjectbyID(projectInfo) {
            vm.showTrainingCurriculumLoading = true;
            projectsSvc.getProjectByOrgID().then(function(response) {
                vm.projectDetailsObj.savedProjects = [];
                vm.projectDetailsObj.savedProjects = response.data;
                trainings.projectList = vm.projectDetailsObj.savedProjects;
                vm.projectDetailsObj.savedProjects.push({
                    'project_id': 'createNewProject',
                    'projectName': 'Create New Project'
                })
                if (projectInfo) {
                    var projById = _.filter(vm.projectDetailsObj.savedProjects, function(item) {
                        return item.project_id === projectInfo.projectId;
                    })[0];

                    vm.selectedSection.project.projectInfo = projById;
                }
                vm.showTrainingCurriculumLoading = false;
            }, function(error) {
                vm.showTrainingCurriculumLoading = false;
                if (error.data != undefined) {
                    errorSvc.displayErrorString(error.data.errorCode, 'error', 15);
                }
                errorSvc.logProcessing(error, 'error');
            });
        }
        getProjectbyID();


        // retrieve the section data from model
        if (vm.trainingsModel.sections.length > 0) {
            vm.selectedSection = vm.trainingsModel.sections[0];
        }

        vm.addNewStep = function(secName) {
            switch (secName) {
                case 'ContentSection':
                    var contSteps = angular.copy(trainings.contentSteps);
                    var randomID = Guid.newGuid();
                    contSteps.id = 'steps_' + randomID;
                    vm.selectedSection.contentBuilder.push(contSteps);
                    break;
                case 'HookSection':
                    vm.hooks.push({ hookID: Guid.newGuid() });

            }
        }

        function removeStep(step) {
            var avaliableStep = _.filter(vm.selectedSection.contentBuilder, function(item) {
                return item.id !== step.id
            })
            vm.selectedSection.contentBuilder = avaliableStep;
        }

        vm.toggleStep = function(step) {
            step.expandable = !step.expandable;
        }

        vm.addSectionFn = function(section) {
            var contSteps = angular.copy(trainings.contentSteps);
            var workspace = angular.copy(trainings.workspace);
            var sectionObj = angular.copy(trainings.section);
            var randomID = Guid.newGuid();
            contSteps.id = 'steps_' + randomID;
            workspace.workspace_id = 'workspace_' + randomID;
            if (section === 'Welcome') {
                sectionObj.secName = 'WelcomeSection';
            } else if (section === 'Content') {
                sectionObj.secName = 'ContentSection';
            } else if (section === 'Hook') {
                sectionObj.secName = 'HookSection';
            } else {
                sectionObj.secName = 'WelcomeSection';
            }
            sectionObj.title = section;
            sectionObj.id = randomID;
            sectionObj.contentBuilder.push(contSteps);
            sectionObj.workspaces.push(workspace);
            vm.trainingsModel.sections.push(sectionObj);
            vm.selectedSection = vm.trainingsModel.sections[vm.trainingsModel.sections.length - 1];
        }

        vm.addWorkspace = function() {
            var workspace = angular.copy(trainings.workspace);
            workspace.workspace_id = 'workspace_' + Guid.newGuid();
            vm.selectedSection.workspaces.push(workspace);
        }

        vm.deleteWorkspace = function(workspace) {
            var availableWorkspace = _.filter(vm.selectedSection.workspaces, function(item) {
                return item.workspace_id !== workspace.workspace_id
            })
            vm.selectedSection.workspaces = availableWorkspace;
        }


        function removeSectionFn() {
            var avaliableSection = _.filter(vm.trainingsModel.sections, function(item) {
                return item.id !== vm.selectedSection.id;
            })
            vm.trainingsModel.sections = avaliableSection;
            vm.displaySelectedSection(vm.trainingsModel.sections[0]);
        }

        vm.displaySelectedSection = function(section) {
            vm.selectedSection = section;
        }


        vm.projectOptionSelection = function(projectId, section) {
            if (projectId === 'createNewProject') {
                angular.element(document.body).addClass("training_dialog_body");
                $mdDialog.show({
                        template: '<create-project></create-project>',
                        parent: angular.element(document.querySelector('body'))
                    })
                    .then(function(response) {
                        // console.log('success');
                        if (response) {
                            getProjectbyID(response);
                        }
                    }, function(error) {
                        console.log(error);
                    });
            }
        }

        vm.addProjectVariable = function(variable, section) {
            var variableID = Guid.newGuid();
            section.project.variables.push({
                id: variableID,
                key: variable,
                value: ''
            })
        }

        vm.removeVariableFromList = function(variable, variablesList) {
            var varList = _.filter(variablesList, function(item) {
                return item.id !== variable.id;
            });
            vm.selectedSection.project.variables = varList;
        }

        vm.stepUploadDocument = function(e, inputId) {
            vm.showTrainingCurriculumLoading = true;
            var currentStep = angular.element(e).scope().step;
            var reader = new FileReader();
            reader.onload = (function(file, length) {
                return function(loadEvent) {
                    var fileName = Guid.newGuid();
                    uploadDataSvc.uploadData(loadEvent.target.result, fileName, file.type).then(function() {
                        var fileData = {
                            title: file.name,
                            url: '',
                            nameEditMode: true,
                            id: fileName,
                            baseURL: "data:" + file.type + ";base64," + btoa(vm.getStringFromCharCode(new Uint8Array(loadEvent.target.result))),
                            urltype: 'dynamic'
                        };
                        currentStep.uploadDocument = fileData;
                        vm.showTrainingCurriculumLoading = false;
                        console.log('file uploaded successfully');
                    }, function(error) {
                        vm.showTrainingCurriculumLoading = false;
                        console.log('file not uploaded' + error);
                    });
                }
            })(e.files[0], e.files.length);
            reader.readAsArrayBuffer(e.files[0]);
        }

        vm.getStringFromCharCode = function(imageArray) {
            var CHUNK_SIZE = 0x1E000; // equivalent to 122880 in decimal notation
            var index = 0;
            var result = '';
            var sliced;
            var arrLength = imageArray.length;
            while (index < arrLength) {
                sliced = imageArray.slice(index, Math.min(index + CHUNK_SIZE, arrLength));
                result += String.fromCharCode.apply(null, sliced);
                index += CHUNK_SIZE;
            }
            return result;
        }

        vm.removeFile = function(step) {
            step.uploadDocument = null;
        }

        vm.confirmationPop = function(flag, value, index) {
            var objCustomDialog = angular.copy(customDialog.dialog);
            vm.FlagForDelete = flag;
            if (vm.FlagForDelete === 'changeEditorForStep') {
                vm.currentStepindex = {
                    index: index,
                    type: value
                };
            } else {
                vm.currentStepindex = value;
            }
            objCustomDialog.message = 'All changes will be discarded. Click yes to exit.';
            objCustomDialog.buttons = [{
                    text: 'Yes',
                    iconText: 'check_circle',
                    callback: vm.confirmYes
                },
                {
                    text: 'No',
                    iconText: 'cancel',
                    callback: vm.confirmNo
                }
            ];

            errorSvc.displayConfirmation(objCustomDialog);
        };

        vm.confirmYes = function() {
            if (vm.FlagForDelete === 'changeEditorForStep') {
                vm.selectedSection.contentBuilder[vm.currentStepindex.index] = angular.copy(vm.contentSteps);
                vm.selectedSection.contentBuilder[vm.currentStepindex.index].contentType = vm.currentStepindex.type;
                vm.selectedSection.contentBuilder[vm.currentStepindex.index].confirmationType = vm.currentStepindex.type;
            } else if (vm.FlagForDelete === 'deleteSection') {
                removeSectionFn();
            } else if (vm.FlagForDelete === 'deleteStep') {
                removeStep(vm.currentStepindex);
            }
            vm.currentStepindex = undefined;
            errorSvc.closeToastr();
        }

        vm.confirmNo = function() {
            errorSvc.closeToastr();
        }

        vm.addHooks = function(id, item) {
            if (item) {
                ExtendEditor.create(document.getElementById('hooks_' + id), {
                    hostUrl: Auth0_Extend_HostURL,
                    webtaskContainer: Auth0_Extend_Container,
                    token: Auth0_Extend_Token,
                    webtaskName: item.hookID,
                    createIfNotExists: true,
                    allowRenaming: false,
                    allowDeleting: false,
                    allowEditingSecrets: false,
                    allowEditingMeta: false,
                    allowEditingSchedule: false,
                    allowSwitchingTemplates: false,
                    allowCreatingFromTemplate: false,
                    allowEditingDependencies: false
                });
            }
        };

    }
})();