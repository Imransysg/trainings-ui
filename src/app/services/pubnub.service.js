(function () {
    'use strict';
    angular.module('veegam-trials')
        .service('pubnubSvc', pubnubSvc);

    pubnubSvc.$inject = ['Pubnub', '$pubnubChannel'];

    function pubnubSvc(Pubnub, $pubnubChannel) {
        var self = this;

        //The $pubnubChannel object allows you to seamlessly bind a PubNub channel to a scope variable, 
        //which gets automatically updated when there is new realtime data published in that channel. 
        //It also lets you interact directly with the channel by calling dedicated methods available into 
        //the $scope variable bound to the $pubnubChannel object.
        
        //Instantiating the $pubnubChannel is the only step needed to have a scope variable that reflects 
        //the realtime data from a channel. It subscribes to the channel for you, load initial data if 
        //needed and receive new realtime data automatically.
        self.pubnubChannel = function (channel) {
            var config = {
                //autoload: 50 // Autoload the channel with 50 messages (should be < 100)
            }
            return $pubnubChannel(channel, config);
        }

        self.subscribe = function (channel) {
            Pubnub.subscribe({
                channels : [channel],
                triggerEvents: ['message']
            })
        }        

        self.publish = function (channel, message, callback) {
            Pubnub.publish(
                {
                    channel: channel,
                    message: message
                }, callback
                // function (status, response) {
                //     console.log(response);
                // }
            );
        }
        /**
         * PLEASE DO NOT USE THIS FUNCTION. INSTEAD OF IT, PLEASE CALL $destroy OF MESSAGE 
         * WHERE YOU SUBSCRIBE IT USING $pubnubChannel
         */
        self.unsubscribe = function (channel) {
            var channels = [];
            channels.push(channel);
            Pubnub.unsubscribe({
                channels: channels
            });
        }

        return self;
    }
})();