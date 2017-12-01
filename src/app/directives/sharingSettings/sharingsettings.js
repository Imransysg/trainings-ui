(function() {
    'use strict';

    angular.module('veegam-trials').directive('sharingSettings', function() {
        return {
            restrice: 'AE',
            templateUrl: 'app/directives/sharingSettings/sharingSettings.view.html',
            scope: {
                sharingSettingsObj: "=sharingSettingsObj",
                sharedWith: "=sharedWith",
                public: "=public"
            },
            controller: function($scope, $rootScope, createTrialService) {
                //if sharedwith array length in greater than 0, enable collaborator checkbox.
                if ($scope.sharedWith.length > 0) {
                    $scope.sharingSettingsObj.collaborators = true;
                }

                //which nav item is selected under collaborators
                $scope.currentNavItem = 'Users';

                //array of available permission list
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

                // Get all the users based on the selected organizations from the object
                $scope.changeTeamGroupOrg = function(organization) {
                    if (organization) {
                        $scope.sharingSettingsObj.team.selectedOrg = organization;
                        $scope.sharingSettingsObj.team.teams = $scope.orgTeamDetails[organization];
                    }
                }

                //add item to collection
                $scope.addItemToItemGroup = function(type) {
                    var item;
                    switch (type) {
                        case 'user':
                            $scope.sharingSettingsObj.user.orgID = 'Sysgain'; // for the Alpha release only. Need to remove it in future
                            item = _.filter($scope.sharedWith, function(item) {
                                return (item.value === ($scope.sharingSettingsObj.user.selectedUser + ':' + $scope.sharingSettingsObj.user.orgID));
                            })
                            if (item.length === 0) {
                                $scope.sharedWith.push({
                                    type: 'user',
                                    value: $scope.sharingSettingsObj.user.selectedUser + ':' + $scope.sharingSettingsObj.user.orgID,
                                    policy: $scope.permissionList[2].id
                                })
                            }
                            $scope.sharingSettingsObj.user.selectedUser = '';
                            break;
                        case 'team':
                            item = _.filter($scope.sharedWith, function(item) {
                                return (item.value === ($scope.sharingSettingsObj.team.selectedTeam + ':' + $scope.sharingSettingsObj.team.orgName));
                            })
                            if (item.length === 0) {
                                $scope.sharedWith.push({
                                    type: 'team',
                                    value: $scope.sharingSettingsObj.team.selectedTeam + ':' + $scope.sharingSettingsObj.team.orgName,
                                    policy: $scope.permissionList[2].id
                                })
                            }
                            $scope.sharingSettingsObj.team.selectedTeam = '';
                            break;

                        case 'organization':
                            item = _.filter($scope.sharedWith, function(item) {
                                return (item.value === $scope.sharingSettingsObj.organizations.selectedOrganization);
                            })
                            if (item.length === 0) {
                                $scope.sharedWith.push({
                                    type: 'organization',
                                    value: $scope.sharingSettingsObj.organizations.selectedOrganization,
                                    policy: $scope.permissionList[2].id
                                })
                            }
                            $scope.sharingSettingsObj.organizations.selectedOrganization = '';
                            break;

                        case 'email':
                            var item = _.filter($scope.sharedWith, function(item) {
                                return (item.value === $scope.sharingSettingsObj.email.selectedEmail);
                            })
                            if (item.length === 0) {
                                $scope.sharedWith.push({
                                    type: 'email',
                                    value: $scope.sharingSettingsObj.email.selectedEmail,
                                    policy: $scope.permissionList[0].id
                                })
                            }
                            $scope.sharingSettingsObj.email.selectedEmail = '';
                            break;

                        case 'domain':
                            item = _.filter($scope.sharedWith, function(item) {
                                return (item.value === $scope.sharingSettingsObj.emailDomain.domain);
                            })
                            if (item.length === 0) {
                                $scope.sharedWith.push({
                                    type: 'domain',
                                    value: $scope.sharingSettingsObj.emailDomain.domain,
                                    policy: $scope.permissionList[2].id
                                })
                            }
                            $scope.sharingSettingsObj.emailDomain.domain = '';
                            break;
                    }
                }

                //delete item from collection
                $scope.deleteSavedItem = function(data) {
                    $scope.sharedWith = $scope.sharedWith.filter(function(obj) {
                        return (
                            obj.value !== data.value);
                    });
                    // $scope.public = !$scope.public;
                }

                //set validations for sharing settings tab on create demo lab screen
                if ($scope.sharingSettingsObj.currentPage === 5) {
                    createTrialService.setSharingSettingsValidate(true);
                }

                //open help section of sharing settings
                $scope.helpSection = function(value) {
                    $rootScope.$broadcast('helpSection', value);
                }
            }
        };
    })
})();