/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formDatePicker', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/views/directives/form/date_picker.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                mode: '=',
                isOpen: '=',
                options: '=',
                maxDate: '=',
                minDate: '=',
                open: '&',
                req: '@'
            },
            require: "^UserRegisterCtrl",
            link: function(scope, element, attrs, UserRegisterCtrl) {
                scope.doit = function(){
                    UserRegisterCtrl.openDatePicker();
                }
            }

        }
    });