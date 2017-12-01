
(function () {
    'use strict';
    angular.module('veegam-trials')
        .service('planSvc', planSvcFn);

    planSvcFn.$inject = ['httpservice', 'apiUrl', 'utilsService'];

    function planSvcFn(httpservice, apiUrl, utilsService) {
        var self = this;
        apiUrl = apiUrl + "/plans-service";
        self.orgID = utilsService.getOrganization();
        //get all Plans.
        self.getPlans = function () {
            var url = apiUrl + '/org/' + self.orgID + '/plans';
            return httpservice.get(url, true);
        }

        self.createPayment = function (cardData) {

            var url = apiUrl + '/org/' + self.orgID + '/subscription';
            var userId = utilsService.getUserId();
            var obj = {
                "plan_id": cardData.plan_id,
                "customer": {
                    "id": userId
                },
                "payment_method": {
                    "gateway_account_id": "gw_1mk51SUQXjWYS9bq9",
                    "tmp_token": cardData.token_id,
                    "type":"card"
                }
            };
            return httpservice.post(url,obj, true);
        }

        return self;
    }
})();