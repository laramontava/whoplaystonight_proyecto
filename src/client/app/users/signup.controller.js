(function () {
    'use strict';

    angular
        .module('app.users')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$scope', '$location'];
    /* @ngInject */
    function SignUpController(logger, dataservice, $state, $timeout, $rootScope, $scope, $location) {
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
        vm.sendtokentoemail = sendtokentoemail;
        vm.changepassword = changepassword;

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
                'avatar': "images/avatar/default-avatar.jpg",
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
                to: vm.email,
                from: 'laramontava@gmail.com',
                subject: 'Confirmar registro',
                text: vm.text,
                messageDirection: 'to_user',
                type: 'signup'
            };
            dataservice.sendemail(data).then(function (response) {
                console.log("sendemail");
                if (response) {
                    console.log("true");
                    logger.success("Activate your account from the message sent to your mail");
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
                } else if (response.data === 'notactivated') {
                    logger.error('Your account is not activated');
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

        function sendtokentoemail() {
            var data = {
                email: vm.email,
                from: 'laramontava@gmail.com',
                token: vm.text,
                type: 'password',
                messageDirection: 'to_user',
                subject: '¿Has olvidado la contraseña?'
            };
            var dataUserJSON = JSON.stringify(data);
            console.log(dataUserJSON);
            dataservice.RecoverPassword(dataUserJSON).then(function (response) {
                if (response) {
                    dataservice.sendemail(data).then(function (response) {
                        console.log("sendemail");
                        if (response) {
                            logger.success("Te enviamos un enlace para que cambies la contraseña");
                            vm.email = '';
                            vm.username = '';
                            $timeout(function () {
                                $state.go('main');
                            }, 1000);
                        } else {
                            logger.error("Error sending the email, try later");
                        }
                    });
                }
            });
        }
        
        function changepassword() {
            var data = {
                newpass: vm.password,
                email: $location.search().email,
                token: $location.search().token
            }
            var dataUserJSON = JSON.stringify(data);
            dataservice.ChangePasswordBD(dataUserJSON).then(function (response) {
                if (response) {
                    logger.success("Contraseña cambiada correctamente");
                    $state.go('main');
                } else {
                    logger.error("Error al cambiar la contraseña");
                    $state.go('main');
                }
            });
        }
    }
})();