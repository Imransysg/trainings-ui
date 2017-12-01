(function() {
    'use strict';

    angular.module('veegam-trials').component('trainingLabLandingPage', {
        controller: TrainingLabLandingPageController,
        controllerAs: 'vm',
        templateUrl: 'app/components/trainingLabLandingPage/trainingLabLandingPage.view.html',
    });

    /** @ngInject */
    TrainingLabLandingPageController.$inject = ['$scope', '$element', '$state', 'trainingsSvc', 'trainings', '$rootScope', 'uploadDataSvc', 'Guid', 'errorSvc', 'customDialog', '$anchorScroll', '$window'];

    function TrainingLabLandingPageController($scope, $element, $state, trainingsSvc, trainings, $rootScope, uploadDataSvc, Guid, errorSvc, customDialog, $anchorScrol, $window) {
        var vm = this;
        vm.trainingsModel = trainingsSvc.getTrainingModel().trainings;
        // vm.imageLimit = {
        //     icons: false,
        //     previewImage: false,
        //     archDiagram: false
        // };
        // vm.formatType = "icons";
        vm.showCreateTrainingLoading = false;
        vm.fileurl = {};
        vm.createTrainingFg = '';
        vm.categoryToRemove = {};
        vm.coAuthorToRemove = {};
        //Array to fill dropdown of type of documents user can upload
        vm.DocumentTypeList = ['Datasheets', 'Whitepapers', 'Custom'];
        vm.trainingCategory = [
            { category: '1', name: 'Oracle' },
            { category: '2', name: 'Azure' },
            { category: '3', name: 'Aws' },
        ];
        vm.skillLevel = [
            { name: 'Beginner' },
            { name: 'Experienced' },
            { name: 'Advanced' }
        ];
        vm.trainingAuthor = [
            { name: 'James', profile: 'Product Manager' },
            { name: 'Satta Ravi', profile: 'Cloud Engineer' },
            { name: 'John', profile: 'Engineer' }
        ];
        vm.trainingSelectedFileType = '';
        vm.dropdownIsOpen = false;
        vm.trainingUploadType = '';

        //variable to scroll inner section
        vm.scrollAnchor = 'training_basic_details';
        vm.labBrochureBasicDetailsValidate = null;
        vm.labBrochureImageValidate = null;
        vm.labBrochureDocsValidate = null;
        vm.currentSelectedTabLabBrochure = vm.scrollAnchor;

        function getTrainingLandingInfo() {
            vm.createTrainingFg = trainingsSvc.getCreateTrainingFlag();
        }

        getTrainingLandingInfo();

        vm.helpSection = function(value) {
            $rootScope.$broadcast('trainingHelpSection', value);
        }

        //Function to remove selected category on click of cancel button
        vm.removeCategoryData = function(category) {
            vm.categoryToRemove = category;
            angular.forEach(vm.trainingsModel.category, function(category) {
                if (category == vm.categoryToRemove) {
                    var index = vm.trainingsModel.category.indexOf(category);
                    vm.trainingsModel.category.splice(index, 1);
                }
            });
            vm.userToRemove = [];
        }
        vm.removeCoAuthorData = function(category) {
            vm.coAuthorToRemove = category;
            angular.forEach(vm.trainingsModel.coAuthor, function(category) {
                if (category == vm.coAuthorToRemove) {
                    var index = vm.trainingsModel.coAuthor.indexOf(category);
                    vm.trainingsModel.coAuthor.splice(index, 1);
                }
            });
            vm.userToRemove = [];
        }
        vm.slelctSkillLevel = function(skill) {
            vm.trainingsModel.skillLevel = skill;
        }

        vm.continueToFill = function() {
            trainingsSvc.setCreateTrainingFlag('');
        }

        //Function for got to anchor
        vm.goToAnchor = function(anchor) {
            if (vm.currentSelectedTabLabBrochure == 'training_basic_details') {
                if (vm.trainingsModel.title && vm.trainingsModel.title !== '' && vm.trainingsModel.category && vm.trainingsModel.category !== '' && vm.trainingsModel.coAuthor && vm.trainingsModel.coAuthor !== '' && vm.trainingsModel.skillLevel && vm.trainingsModel.skillLevel !== '' && vm.trainingsModel.shortDescription && vm.trainingsModel.shortDescription !== '' && vm.trainingsModel.longDescription && vm.trainingsModel.longDescription !== '' && vm.trainingsModel.preRequisites && vm.trainingsModel.preRequisites !== '') {
                    vm.labBrochureBasicDetailsValidate = true;
                } else {
                    vm.labBrochureBasicDetailsValidate = false;
                }
            } else if (vm.currentSelectedTabLabBrochure == 'training_image_icons') {
                if (vm.trainingsModel.icons && vm.trainingsModel.icons.length !== 0 && vm.trainingsModel.labImage.baseURL && vm.trainingsModel.labImage.baseURL !== '') {
                    vm.labBrochureImageValidate = true;
                } else {
                    vm.labBrochureImageValidate = false;
                }
            } else if (vm.currentSelectedTabLabBrochure == 'training_images_videos') {
                if (vm.trainingsModel.usermanual && vm.trainingsModel.usermanual.length !== 0 && vm.trainingsModel.videos && vm.trainingsModel.videos.length !== 0) {
                    vm.labBrochureDocsValidate = true;
                } else {
                    vm.labBrochureDocsValidate = false;
                }
            }
            vm.currentSelectedTabLabBrochure = anchor;
            vm.scrollAnchor = anchor;
        }

        vm.getTrainingBasicDetailClass = function() {
            if (vm.scrollAnchor === 'training_basic_details') {
                if (vm.labBrochureBasicDetailsValidate === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }

            } else if (vm.scrollAnchor !== 'training_basic_details' && vm.labBrochureBasicDetailsValidate === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_basic_details' && vm.labBrochureBasicDetailsValidate === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_basic_details' && vm.labBrochureBasicDetailsValidate === true) {
                return 'trial_step_valid';
            }
        }

        vm.getTrainingLabImageClass = function() {
            if (vm.scrollAnchor === 'training_image_icons') {
                if (vm.labBrochureImageValidate === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }
            } else if (vm.scrollAnchor !== 'training_image_icons' && vm.labBrochureImageValidate === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_image_icons' && vm.labBrochureImageValidate === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_image_icons' && vm.labBrochureImageValidate === true) {
                return 'trial_step_valid';
            }
        }

        vm.getTrainingDocsVideosClass = function() {
            if (vm.scrollAnchor === 'training_images_videos') {
                if (vm.labBrochureDocsValidate === true) {
                    return 'trial_step_valid trial_step_active';
                } else {
                    return 'trial_step_active';
                }
            } else if (vm.scrollAnchor !== 'training_images_videos' && vm.labBrochureDocsValidate === null) {
                return '';
            } else if (vm.scrollAnchor !== 'training_images_videos' && vm.labBrochureDocsValidate === false) {
                return 'trial_step_invalid';
            } else if (vm.scrollAnchor !== 'training_images_videos' && vm.labBrochureDocsValidate === true) {
                return 'trial_step_valid';
            }
        }

        //Function to change the file type to Url
        vm.uploadTypeFileUrl = function() {
            var fileName = Guid.newGuid();
            var modelArray = vm.trainingsModel.usermanual;
            var fileData = {
                title: '',
                url: '',
                nameEditMode: true,
                id: fileName,
                urltype: 'dynamic'
            };
            modelArray.push(fileData);
            vm.dropdownIsOpen = false;
            console.log('file uploaded successfully');
        }

        vm.fileNameChanged = function(e, inputId) {
            vm.showCreateStackLoading = true;
            var modelArray = vm.trainingsModel.labImage;
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
                        //flag === 'additional docs' ? (fileData.type = '') : '';

                        // obj.length == 0 ? modelArray.push(fileData) : "";

                        vm.trainingsModel.labImage = fileData;

                        vm.showCreateStackLoading = false;
                        console.log('file uploaded successfully');
                    }, function(error) {
                        vm.showCreateStackLoading = false;
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

        vm.uploadFile = function(e, inputID, flag) {
            vm.showCreateStackLoading = true;
            vm.dropdownIsOpen = false;
            var sizeLimit = flag === 'video' ? (1024 * 1024 * 150) : (1024 * 1024 * 50);
            var modelArray = flag === 'video' ? vm.trainingsModel.videos : (flag === 'user manual' ? vm.trainingsModel.usermanual : vm.trainingsModel.supportingDocs);
            var elementId = $('#' + inputID);
            for (var i = 0; i < e.files.length; i++) {
                if ((e.files[i].name.endsWith(".doc") || e.files[i].name.endsWith(".docx") || e.files[i].name.endsWith(".docm") || e.files[i].name.endsWith(".xls") || e.files[i].name.endsWith(".xlsx") || e.files[i].name.endsWith(".pdf") || e.files[i].name.endsWith(".ppt") || e.files[i].name.endsWith(".pptm") || e.files[i].name.endsWith(".pptx") || e.files[i].name.endsWith(".txt") || e.files[i].type.startsWith("video/")) && (flag === 'user manual' || flag === 'additional docs' || flag === 'video')) {
                    var obj = _.filter(modelArray, function(item) {
                        return item.title === e.files[i].name;
                    })
                    if (obj.length === 0) {
                        vm.showCreateStackLoading = true;
                        if (e.files[i].size <= sizeLimit) {
                            var reader = new FileReader();
                            reader.onload = (function(file, length, index) {
                                return function(loadEvent) {
                                    var nameArr = file.name.split('.');
                                    var fileName = Guid.newGuid() + "." + nameArr[nameArr.length - 1];
                                    uploadDataSvc.uploadData(loadEvent.target.result, fileName, file.type).then(function() {
                                        var fileData = {
                                            title: file.name,
                                            url: '',
                                            nameEditMode: true,
                                            id: fileName,
                                            urltype: 'dynamic'
                                        };
                                        flag === 'additional docs' ? (fileData.type = '') : '';

                                        obj.length == 0 ? modelArray.push(fileData) : "";

                                        if (length - 1 === index) {
                                            vm.showCreateStackLoading = false;
                                        }
                                        console.log('file uploaded successfully');
                                    }, function(error) {
                                        if (length - 1 === index) {
                                            vm.showCreateStackLoading = false;
                                        }
                                        console.log('file not uploaded' + error);
                                    });
                                }
                            })(e.files[i], e.files.length, i);
                            reader.readAsArrayBuffer(e.files[i]);
                        } else {
                            vm.showCreateStackLoading = false;
                            errorSvc.displayErrorString('ui-errors_7', 'error', 15);
                            errorSvc.logProcessing(flag + ' ' + 'size limit exceed', 'error');
                        }
                    } else {
                        vm.showCreateStackLoading = false;
                        errorSvc.displayErrorString('ui-errors_1', 'error', 15);
                        errorSvc.logProcessing((flag + ' ' + 'upload issue'), 'error');
                    }
                } else {
                    vm.showCreateStackLoading = false;
                    errorSvc.displayErrorString('ui-errors_2', 'error', 15);
                    errorSvc.logProcessing(flag + ' ' + 'wrong type uploaded', 'error');
                }
                if ((i + 1) === e.files.length) {
                    elementId.val('');
                }
            }
        }

        //function to remove items from demo lab 
        vm.removefromTraining = function(whichList, value) {
            switch (whichList) {
                case 'icons':
                    vm.trainingsModel.icons = filterRemovedItem(vm.trainingsModel.icons);
                    break;
                case 'images':
                    vm.trainingsModel.images = filterRemovedItem(vm.trainingsModel.images);
                    break;
                case 'previewImage':
                    vm.trainingsModel.previewImage = filterRemovedItem(vm.trainingsModel.previewImage);
                    break;
                case 'diagram':
                    vm.trainingsModel.architectureImage = filterRemovedItem(vm.trainingsModel.architectureImage);
                    break;
                case 'user manual':
                    vm.trainingsModel.usermanual = filterRemovedItem(vm.trainingsModel.usermanual);
                    break;
                case 'additional docs':
                    vm.trainingsModel.supportingDocs = filterRemovedItem(vm.trainingsModel.supportingDocs);
                    $scope.checkDocumentType();
                    break;
                case 'video':
                    vm.trainingsModel.videos = filterRemovedItem(vm.trainingsModel.videos);
                    break;
            }

            // Method to remove a object from its list
            function filterRemovedItem(items) {
                var modifiedItems;
                modifiedItems = _.filter(items, function(item) {
                    if (value.urltype == "dynamic") {
                        return item.id !== value.id;
                    } else {
                        return item.url !== value.url;
                    }
                });
                return modifiedItems;
            }
        }
        vm.dropdownTarget = null;
        vm.windowTarget = null;
        //Method to toggle dropdowns
        vm.toggleDropdown = function(event) {
            vm.dropdownTarget = event.target;
            if (vm.dropdownIsOpen) {
                vm.dropdownIsOpen = false;
            } else {
                vm.dropdownIsOpen = true;
            }


        }

        angular.element($window).on('click', function(event) {
            // vm.windowTarget = element.target;
            var customButton = document.getElementById('custom_dropdown');
            var expectedTarget = document.getElementById('cp');
            var browserCustom = document.getElementById('trainingUserManualID');

            if (event.target != customButton && event.target != expectedTarget && event.target != browserCustom) {
                $scope.$applyAsync(function() {
                    vm.dropdownIsOpen = false;
                });
            }
        });
        $scope.$on('$destroy', function() {
            angular.element($window).off('click');
        });
        // Method to check type for all uploaded supporting document types have been specified
        $scope.checkDocumentType = function() {
            var temp = true;
            _.each(vm.trainingsModel.supportingDocs, function(supportingDoc) {
                if (supportingDoc.type == '' || supportingDoc.type == 'Custom') {
                    temp = false;
                }
            });
            if (temp) {
                vm.showDocumentTypeMessage = false;
            } else {
                vm.showDocumentTypeMessage = true;
            }
        }

        //function in case a url is added for video or supporting document
        vm.addUrl = function(type) {
            var modelArray = type === 'video' ? vm.trainingsModel.videos : (type === 'user manual' ? vm.trainingsModel.usermanual : vm.trainingsModel.supportingDocs);
            var urlValue = type === 'video' ? vm.fileurl.videoUrl : (type === 'user manual' ? vm.fileurl.manualUrl : vm.fileurl.documentUrl);
            var obj;
            if (modelArray && urlValue !== '') {
                obj = _.filter(modelArray, function(item) {
                    return item.url === urlValue;
                })
                if (obj.length === 0) {
                    var dataobj = {
                        title: '',
                        url: urlValue,
                        nameEditMode: true,
                        urltype: 'static'
                    }
                    if (type === 'additional docs') {
                        dataobj.type = '';
                        vm.showDocumentTypeMessage = true
                    }
                    modelArray.push(dataobj);
                    type === 'video' ? vm.fileurl.videoUrl = "" : (type === 'user manual' ? vm.fileurl.manualUrl = "" : vm.fileurl.documentUrl = "");
                }
            }
        }

        //Watch to check the validation of the sections inLab brochure
        // $scope.$watch(function() {
        //     return vm.trainingsModel;
        // }, function(oldVal, newVal) {
        //     //Validate Basic Details
        //     if (vm.trainingsModel.title && vm.trainingsModel.title !== '' && vm.trainingsModel.category && vm.trainingsModel.category !== '' && vm.trainingsModel.coAuthor && vm.trainingsModel.coAuthor !== '' && vm.trainingsModel.skillLevel && vm.trainingsModel.skillLevel !== '' && vm.trainingsModel.shortDescription && vm.trainingsModel.shortDescription !== '' && vm.trainingsModel.longDescription && vm.trainingsModel.longDescription !== '' && vm.trainingsModel.preRequisites && vm.trainingsModel.preRequisites !== '') {
        //         vm.labBrochureBasicDetailsValidate = true;
        //     } else {
        //         vm.labBrochureBasicDetailsValidate = false;
        //     }

        //     //Validate Icon upload
        //     if (vm.trainingsModel.icons && vm.trainingsModel.icons.length !== 0 && vm.trainingsModel.labImage.baseURL && vm.trainingsModel.labImage.baseURL !== '') {
        //         vm.labBrochureImageValidate = true;
        //     } else {
        //         vm.labBrochureImageValidate = false;
        //     }

        //     //Validate Video upload
        //     if (vm.trainingsModel.usermanual && vm.trainingsModel.usermanual.length !== 0 && vm.trainingsModel.videos && vm.trainingsModel.videos.length !== 0) {
        //         vm.labBrochureDocsValidate = true;
        //     } else {
        //         vm.labBrochureDocsValidate = false;
        //     }
        // }, true);

    }
})();