/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputRadio', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.baseUrl + 'ng/common/form/views/input_radio.html',
            scope: {
                label: '@',
                name: '=',
                options: '=',
                model: '=',
                req: '@'
            }
        }
    });
