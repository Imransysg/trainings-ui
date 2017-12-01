(function() {
    'use strict';

    angular.module('veegam-trials').directive('fileinput', ['uploadDataSvc', 'Guid', 'errorSvc', function(uploadDataSvc, Guid, errorSvc) {
        return {
            restrict: 'AE',
            scope: {
                list: "=list",
                limitNumber: "=limitNumber",
                createTrialLoader: "=createTrialLoader",
                formatType: "=formatType"
            },
            link: function(scope, element, attrs) {
                element.bind("change", function(changeEvent) {
                    var elementID = $('#' + attrs.id);
                    var _URL = window.URL || window.webkitURL;
                    var totalFileLength = changeEvent.target.files.length;
                    if ((totalFileLength > 4 || (totalFileLength + scope.list.length) > 4) && attrs.limitNumber) {
                        scope.$apply(function() {
                            if (scope.limitNumber != undefined) {
                                scope.limitNumber = true;
                            }
                        });
                    } else {
                        if (scope.limitNumber != undefined) {
                            scope.limitNumber = false;
                        }
                        scope.createTrialLoader = true;

                        for (var i = 0; i < changeEvent.target.files.length; i++) {

                            if (changeEvent.target.files[i].type.startsWith("image/")) {
                                var obj = _.filter(scope.list, function(item) {
                                    return item.title === changeEvent.target.files[i].name;
                                })
                                if (obj.length === 0) {
                                    // if (scope.formatType && scope.formatType === 'icons') {
                                    //     if (changeEvent.target.files[i].type === "image/png") {
                                    //         var file = changeEvent.target.files[i];
                                    //         var img = new Image();
                                    //         img.onload = function() {
                                    //             alert(this.width + " " + this.height);
                                    //         }
                                    //         img.src = _URL.createObjectURL(file);
                                    //     }
                                    // }
                                    var fileinput = changeEvent.target.files[i];
                                    var type = changeEvent.target.files[i].type;
                                    var reader = new FileReader();
                                    reader.onload = (function(file, element, fileLength, index, type) {
                                        return function(loadEvent) {
                                            scope.createListItem(loadEvent, file, element, fileLength, index, type)
                                        }
                                    })(fileinput, elementID, totalFileLength, i, type);
                                    // x
                                    fileinput ? reader.readAsArrayBuffer(fileinput) : "";
                                } else {
                                    scope.createTrialLoader = false;
                                    errorSvc.displayErrorString('ui-errors_5', 'error', 15);
                                }
                            } else {
                                scope.createTrialLoader = false;
                                errorSvc.displayErrorString('ui-errors_6', 'error', 15);
                            }
                            if ((i + 1) === changeEvent.target.files.length) {
                                elementID.val('');
                            }
                        }
                    }

                    // scope.createListItem = function(evt, file, element, fileLength, index, data) {
                    scope.createListItem = function(evt, file, element, fileLength, index, type) {
                        var nameArr = file.name.split('.');
                        var fileName = Guid.newGuid() + "." + nameArr[nameArr.length - 1];
                        uploadDataSvc.uploadData(evt.target.result, fileName, type).then(function() {
                            scope.createTrialLoader = false;
                            console.log('file uploaded successfully');
                            var newArray = scope.getStringFromCharCode(new Uint8Array(evt.target.result));
                            obj.length == 0 ? scope.list.push({
                                url: "",
                                title: file.name,
                                baseURL: "data:" + type + ";base64," + btoa(newArray),
                                id: fileName,
                                urltype: 'dynamic'
                            }) : '';
                        }, function(err) {
                            scope.createTrialLoader = false;
                            console.log('file not uploaded' + err);
                        });
                    }

                    scope.getStringFromCharCode = function(imageArray) {
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

                });

            }
        };
    }])
})();