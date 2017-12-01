(function() {
    'use strict';

    angular.module('veegam-trials').component('myStreams', {
        controller: MyStreamsController,
        controllerAs: 'vm',
        templateUrl: 'app/components/myStreams/myStreams.view.html',
    });

    /** @ngInject */
    MyStreamsController.$inject = ['$scope', '$element', '$state', 'httpservice', '$sce', 'ansi2html'];

    function MyStreamsController($scope, $element, $state, httpservice, $sce, ansi2html) {
        var vm = this;
        vm.trainingStep = [];
        vm.selectedStep = {};
        vm.continueDisabled = false;
        vm.terminalToggle = 'terminal';
        // vm.terminal1 = '';
        // vm.terminal2 = '';
        // vm.terminal3 = '';
        // vm.terminal4 = '';
        // var url = 'https://appstream2.ap-northeast-1.aws.amazon.com/#/streaming?reference=fleet%2Ftest-browser-fleet&references=fleet%2Ftest-browser-fleet' + '?decache=' + Math.random();
        vm.terminal1 = 'https://appstream2.ap-northeast-1.aws.amazon.com/authenticate?parameters=eyJ0eXBlIjoiRU5EX1VTRVIiLCJleHBpcmVzIjoiMTUxMTg2ODQ1OSIsImF3c0FjY291bnRJZCI6IjU4MzkxMjk1MzU3OSIsInVzZXJJZCI6InBhbGxhdjEiLCJjYXRhbG9nU291cmNlIjoic3RhY2svdGVzdC1icm93c2VyLXN0YWNrIiwiZmxlZXRSZWYiOiJmbGVldC90ZXN0LWJyb3dzZXItZmxlZXQiLCJhcHBsaWNhdGlvbklkIjoiIiwidXNlckNvbnRleHQiOiIiLCJtYXhVc2VyRHVyYXRpb25JblNlY3MiOiI1NzYwMCJ9&signature=%2Bjp2CP%2BPGgQyyRWyEXH0AjCrGuTTOoI6jrXLIBrQJPU%3D';

        vm.terminal2 = 'https://appstream2.ap-northeast-1.aws.amazon.com/authenticate?parameters=eyJ0eXBlIjoiRU5EX1VTRVIiLCJleHBpcmVzIjoiMTUxMTg2ODUxOCIsImF3c0FjY291bnRJZCI6IjU4MzkxMjk1MzU3OSIsInVzZXJJZCI6InBhbGxhdjIiLCJjYXRhbG9nU291cmNlIjoic3RhY2svdGVzdC1icm93c2VyLXN0YWNrIiwiZmxlZXRSZWYiOiJmbGVldC90ZXN0LWJyb3dzZXItZmxlZXQiLCJhcHBsaWNhdGlvbklkIjoiIiwidXNlckNvbnRleHQiOiIiLCJtYXhVc2VyRHVyYXRpb25JblNlY3MiOiI1NzYwMCJ9&signature=2gxKbXXmBU8kJuDAefqDOjrLEUX3Ggup6ZMhQol8Jis%3D';

        vm.terminal3 = 'https://appstream2.ap-northeast-1.aws.amazon.com/authenticate?parameters=eyJ0eXBlIjoiRU5EX1VTRVIiLCJleHBpcmVzIjoiMTUxMTg2ODU0OSIsImF3c0FjY291bnRJZCI6IjU4MzkxMjk1MzU3OSIsInVzZXJJZCI6InBhbGxhdjMiLCJjYXRhbG9nU291cmNlIjoic3RhY2svdGVzdC1icm93c2VyLXN0YWNrIiwiZmxlZXRSZWYiOiJmbGVldC90ZXN0LWJyb3dzZXItZmxlZXQiLCJhcHBsaWNhdGlvbklkIjoiIiwidXNlckNvbnRleHQiOiIiLCJtYXhVc2VyRHVyYXRpb25JblNlY3MiOiI1NzYwMCJ9&signature=AxNzn%2BLGe1rgDiYgC3uIYwiNEhbJ4WAhqCEozlYFyCA%3D';

        vm.terminal4 = 'https://appstream2.ap-northeast-1.aws.amazon.com/authenticate?parameters=eyJ0eXBlIjoiRU5EX1VTRVIiLCJleHBpcmVzIjoiMTUxMTg2ODk0MiIsImF3c0FjY291bnRJZCI6IjU4MzkxMjk1MzU3OSIsInVzZXJJZCI6InBhbGxhdjQiLCJjYXRhbG9nU291cmNlIjoic3RhY2svdGVzdC1icm93c2VyLXN0YWNrIiwiZmxlZXRSZWYiOiJmbGVldC90ZXN0LWJyb3dzZXItZmxlZXQiLCJhcHBsaWNhdGlvbklkIjoiIiwidXNlckNvbnRleHQiOiIiLCJtYXhVc2VyRHVyYXRpb25JblNlY3MiOiI1NzYwMCJ9&signature=%2BVWtYI3JIX%2FW1B5zKaJq55PcSpw6adLgw7m1I204XuQ%3D';

        vm.getUrl = function(value) {
            if (value === 'browser1') {
                return url1;
            } else if (value === 'browser2') {
                return url2;
            } else if (value === 'browser3') {
                return url3;
            } else if (value === 'browser4') {
                return url4;
            }
        }

        vm.addBrowser = function(id) {
                if (vm.terminalToggle === 'browser1' || vm.terminalToggle === 'browser2' || vm.terminalToggle === 'browser3' || vm.terminalToggle === 'browser4') {
                    var div = document.getElementById(id);
                    var content = div.innerHTML;
                    div.innerHTML = content;
                }

            }
            // Terminal.loadAddon('attach', function() {
            //     console.log('test for addons');
            // });
        var term = new Terminal();
        vm.buffer = [];
        //containers/(id or name)/attach/ws

        var socket = new WebSocket("wss://ws.cloud.docker.com/api/app/v1/" + "veegamtrials" + "/container/" + "9c4f861a-0c77-4051-9fcb-4da02f5637f7" + "/exec");
        // ws.on('open', () => {
        //     console.log('connected');
        // });
        // ws.on('close', () => {
        //     console.log('disconnected');
        //     (isErr === true) ? _reject() : _resolve();
        // });
        // ws.on('message', (_e) => {
        //     term.write(_e.data);
        // });
        var cmd = '';
        term.open(document.getElementById('terminalSample'));

        term.attach(socket);

        var shellprompt = '$ ';

        term.prompt = function() {
            term.write('\r\n' + shellprompt);
        };
        // term.on('data', function (data) {
        //     cmd = cmd + data;
        // });

        socket.onmessage = function(e) {
            // var data=jQuery.parseJSON(e.data);
            // var dataTest=ansi2html.toHtml(data.output);
            // term.write(dataTest);
            term.write(shellprompt);
        }

        term.on('lineFeed', function() {
            var keysEntered = vm.buffer.join('');
            // Or something like that
            socket.send(keysEntered);
            console.log(keysEntered);
            vm.buffer = []; // Empty buffer
        });
        term.write(shellprompt);

        term.off('data');

        term.on('key', function(key, ev) {
            vm.buffer.push(key);
            var printable = (!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey);

            if (ev.keyCode == 13) {
                term.prompt();
            } else if (ev.keyCode == 8) {
                // Do not delete the prompt
                if (term.buffer.x > 2) {
                    term.write('\b \b');
                }
            } else if (printable) {
                term.write(key);
            }
        });

        // Method to get menu list
        function getMenu() {
            httpservice.get('./data/training_step_sample.json', false)
                .then(function(res) {
                    vm.trainingStep = res.data;
                    vm.selectedStep = vm.trainingStep[0];
                    vm.selectedStep.stepIndex = 0;
                }, function(err) {
                    console.log("Error in fetching data from json: " + err);
                });
        }

        // Method to route to nav menu
        function goToNavMenu() {
            $state.go(vm.parentState + '.' + vm.activeNavMenu);
        }

        // Method to intialize the component
        function activate() {
            getMenu();
            // var currentState = $state.$current.name;
            // if (currentState != vm.parentState) {
            //     vm.activeNavMenu = currentState.split('.')[1];
            // }
            // goToNavMenu();
        }

        activate();

        vm.nextStep = function(value) {
            vm.continueDisabled = false;
            vm.selectedStep = vm.trainingStep[value + 1];
            vm.selectedStep.stepIndex = value + 1;
            if (vm.selectedStep.stepIndex === (vm.trainingStep.length - 1)) {
                vm.continueDisabled = true;
            }
        }

        vm.terminalToggleFn = function(value, id) {
            vm.terminalToggle = value;
            if (value === 'browser1' || value === 'browser2' || value === 'browser3' || value === 'browser4') {
                vm.addBrowser(id);
            }
        }
    }

})();