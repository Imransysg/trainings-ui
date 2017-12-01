(function() {

    angular.module('veegam-trials')
        .service('uploadDataSvc', uploadDataSvc);

    uploadDataSvc.$inject = ['$q', 'httpservice', 'Guid', 'utilsService', '$http', 'apiUrl'];

    function uploadDataSvc($q, httpService, Guid, utilsService, $http, apiUrl) {
        var self = this;

        self.uploadData = function(data, name, type) {
            //var fileType = type;
            return $q(function(resolve, reject) {
                //get the cloud upload URL
                var url = apiUrl + '/storage/org/' + utilsService.getOrganization() + '/user/' + utilsService.getUserId() + '/type/oracle/par/ObjectWrite/name/' + name;
                httpService.get(url, true)
                    .then(function(result) {
                        //upload data to the cloud
                        var cloudUrl = result.data.oracleBasePath + result.data.accessUri;
                        $http({
                            url: cloudUrl,
                            method: 'PUT',
                            headers: { 'Content-Type': type },
                            data: new Uint8Array(data),
                            transformRequest: []
                        }).then(function(data) {
                            resolve(data);
                        }, function(err) {
                            //error case
                            reject(err);
                        });
                    }, function(err) {
                        //error case
                        reject(err);
                    });
            });
        }

        self.getImage = function(url) {
            return httpService.get(url, true, 'text');
        }

        self.convertToByteStream = function(file) {
            return $q(function(resolve, reject) {
                var stringData = file.baseURL.split(",")[1];
                var binary_string = window.atob(stringData);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                var convertedFile = bytes.buffer;

                if (file.baseURL) {
                    var type = file.baseURL.split(";")[0].split(":")[1];
                }
                var url = apiUrl + '/storage/org/' + utilsService.getOrganization() + '/user/' + utilsService.getUserId() + '/type/oracle/par/ObjectWrite/name/' + file.id;
                httpService.get(url, true).then(function(result) {
                    // upload data to the cloud
                    var cloudUrl = result.data.oracleBasePath + result.data.accessUri;
                    $http({
                        url: cloudUrl,
                        method: 'PUT',
                        headers: { 'Content-Type': type },
                        data: convertedFile,
                        transformRequest: []
                    }).then(function(data) {
                        resolve(data);
                    }, function(err) {
                        reject(err);
                    });
                }, function(err) {
                    reject(err);
                });
            });
        }
    }
})();