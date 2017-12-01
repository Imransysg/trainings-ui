angular.module('veegam-trials').factory('auth0Service',['$state', '$q', 'AUTH0_CLIENT_ID', 'AUTH0_DOMAIN', 'Auth0_Realm', function($state, $q, AUTH0_CLIENT_ID, AUTH0_DOMAIN, Auth0_Realm) {

    //setup webauth to use auth0 api
    var webAuth = new auth0.WebAuth({
        domain: AUTH0_DOMAIN,
        clientID: AUTH0_CLIENT_ID,
        responseType: 'code'
        //audience:'https://dhruvnewgen.auth0.com/userinfo'
    });

    var userDetails = null;

    function setUserDetails(val) {
        userDetails = val;
    }

    function getUserDetails() {
        if (!userDetails)
            userDetails = JSON.parse(localStorage.getItem('user'));
        return userDetails;
    }

    function login(username, password) {
        var defer = $q.defer();
        webAuth.client.login({
            realm: Auth0_Realm,
            username: username,
            password: password,
            scope: "openid user_metadata app_metadata email"
        }, function(err, authResult) {
            // Auth tokens in the result or an error
            if (err) {
                defer.reject(err);
            }
            else {
                userDetails = authResult;
                localStorage.setItem('user', JSON.stringify(userDetails));
                defer.resolve(userDetails);
            }            
        });
        return defer.promise;
    }

    function forgotPassword(emailUser) {
        var defer = $q.defer();
        webAuth.changePassword({
            connection: Auth0_Realm,
            email: emailUser
        }, function (err, resp) {
            if (err) {
                defer.reject(err);
            }
            else {
                defer.resolve(resp);
            }
        });
        return defer.promise;
    }


    return {
        login: login,
        getUserDetails: getUserDetails,
        setUserDetails: setUserDetails,
        forgotPassword: forgotPassword
    };

}]);