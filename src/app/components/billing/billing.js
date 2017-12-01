(function() {
    'use strict';

    angular.module('veegam-trials').component('billing', {
        controller: BillingController,
        controllerAs: 'vm',
        templateUrl: 'app/components/billing/billing.view.html',
    });

    /** @ngInject */
    function BillingController($scope) {
        var vm = this;
        vm.payment={};
        var token;
        $scope.handleStripe = function(status, response){
            if(response.error) {
                // there was an error. Fix it.
            } else {
                // got stripe token, now charge it or smt
                token = response.id
            }
        }
        
        
        
        //  vm.validatecard=function(){
        //      //4622715356637093
        //      vm.payment.card={number:vm.payment.card.number,exp_month: vm.payment.card.exp_month,
        //          exp_year: vm.payment.card.exp_year,
        //          cvc:vm.payment.card.cvc};
              
        //       stripe.card.createToken(vm.payment.card)
        //.then(function (response) {
        //  console.log('token created for card ending in ', response.card.last4);
        //  var payment = angular.copy(vm.payment);
        //  payment.card = undefined;
        //  payment.token = response.id;
        //  //return $http.post('https://yourserver.com/payments', payment)
        //})
        //.then(function (payment) {
        //  console.log('successfully submitted payment for $', payment.amount)
        //})
        //.catch(function (err) {
        //  if (err.type && /^Stripe/.test(err.type)) {
        //    console.log('Stripe error: ', err.message)
        //  }
        //  else {
        //    console.log('Other error occurred, possibly with your API', err.message)
        //  }
        //})
        //  }
        
    
    }

})();
