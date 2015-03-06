/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputText', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/views/directives/form/input_text.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                req: '@'
            }
        }
    });