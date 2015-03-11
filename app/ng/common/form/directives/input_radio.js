/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputRadio', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/ng/common/form/views/input_radio.html',
            scope: {
                label: '@',
                name: '=',
                options: '=',
                model: '=',
                req: '@'
            }
        }
    });