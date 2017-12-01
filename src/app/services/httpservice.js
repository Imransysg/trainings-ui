angular.module('veegam-trials').factory('httpservice', ['$http', 'OcpApimSubscriptionKey', 'Deploy_OcpApimSubscriptionKey', 'Public_OcpApimSubscriptionKey', function($http, OcpApimSubscriptionKey, Deploy_OcpApimSubscriptionKey, Public_OcpApimSubscriptionKey) {

    // var basePath = '';
    function makeRequest(verb, uri, data, authorizationRequired, contentType, subscriptionType) {
        var headers;
        verb = verb.toLowerCase();
        //debugger
        //start with the uri
        var httpArgs = [uri];
        if (verb.match(/post|put/)) {
            httpArgs.push(data);
        }
        headers = {};
        headers['Ocp-Apim-Trace'] = true;
        switch (subscriptionType) {
            case "deploy":
                headers['Ocp-Apim-Subscription-Key'] = Deploy_OcpApimSubscriptionKey;
                break;
            case "public":
                headers['Ocp-Apim-Subscription-Key'] = Public_OcpApimSubscriptionKey;
                break;
            default:
                headers['Ocp-Apim-Subscription-Key'] = OcpApimSubscriptionKey;

        }

        //headers['Ocp-Apim-Subscription-Key'] = OcpApimSubscriptionKey;
        if (authorizationRequired) {
            headers['Authorization'] = localStorage.getItem("idToken");
        }
        if (contentType) {
            headers['Content-Type'] = contentType;
            headers['Accept'] = contentType;
        }

        httpArgs.push({ 'headers': headers });

        return $http[verb].apply(null, httpArgs);
    }


    return {
        get: function(uri, authorizationRequired, contentType, subscriptionType) {
            return makeRequest('get', uri, null, authorizationRequired, contentType, subscriptionType);
        },
        post: function(uri, data, authorizationRequired, contentType, subscriptionType) {
            return makeRequest('post', uri, data, authorizationRequired, contentType, subscriptionType);
        },
        put: function(uri, data, authorizationRequired, contentType) {
            return makeRequest('put', uri, data, authorizationRequired, contentType);
        },
        delete: function(uri, authorizationRequired) {
            return makeRequest('delete', uri, null, authorizationRequired);
        }
    };

}]);