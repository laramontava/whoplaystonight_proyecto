(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$scope'];
    /* @ngInject */
    function SignUpController(logger, dataservice, $state, $timeout, $rootScope, $scope) {
        var vm = this;
        var datauser = $rootScope.authUser;
        vm.title = 'SignUp';
        vm.username = '';
        vm.email = '';
        vm.password = '';
        vm.rpassword = '';
        vm.name = '';
        vm.text = maketoken();
        vm.submitSignUpForm = submitSignUpForm;
        vm.submitSignInForm = submitSignInForm;
        vm.submitEditProfile = submitEditProfile;
        activate();
        function maketoken() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 50; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        function activate() {
            //logger.info('Activated SignUp View');
        }

        function submitSignUpForm() {
            var datauser = {
                'username': vm.username,
                'email': vm.email,
                'password': vm.password,
                'avatar': "images/avatar/avatar-default.jpg",
                'text': vm.text
            }
            var datausertojson = JSON.stringify(datauser);
            console.log(datausertojson)
            dataservice.SignUp(datausertojson).then(function (response) {
                console.log(response)
                if (response == true) {
                    logger.success("Registered user correctly");
                    $timeout(function () {
                        $state.go('main');
                    }, 1000);
                } else {
                    logger.error("An error has occurred");
                }
            });
            sendSignUp(datausertojson);
        }

        function sendSignUp() {
            var data = {
                name: vm.username,
                from: vm.email,
                to: 'laramontava@gmail.com',
                subject: 'Confirmar registro',
                text: vm.text,
                messageDirection: 'to_user',
                type: 'signup'
            };
            dataservice.sendemail(data).then(function (response) {
                console.log("sendemail");
                if (response) {
                    console.log("true");
                    logger.success("The email has been sent");
                    vm.email = '';
                    vm.username = '';
                    $timeout(function () {
                        $state.go('main');
                    }, 1000);
                } else {
                    console.log("false");
                    logger.error("Error sending the email, try later");
                }
            });
        }

        function submitSignInForm() {
            var data = {
                'username': vm.username,
                'password': vm.password
            };

            var dataUserJSON = JSON.stringify(data);

            dataservice.SignIn(dataUserJSON).then(function (response) {
                console.log(response);
                if (response.data.username === vm.username) {
                    logger.success('Logged In');
                    $rootScope.authUser = response.data;
                    console.log(response.data);
                    $timeout(function () {
                        datauser = $rootScope.authUser
                        $state.go('main');
                    }, 1000);
                } else if (response.data === 'errorcredentials') {
                    logger.error('User or password wrong');
                } else {
                    logger.error('Server error, try again');
                }
            });
        }

        function submitEditProfile() {
            var data = {
                'username': vm.username,
                'name': vm.name,
                'email': vm.email
            };

            var dataUserJSON = JSON.stringify(data);
            console.log(dataUserJSON);
        }

    }
})();