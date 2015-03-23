/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formInputCheckbox', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.baseUrl + 'ng/common/form/views/input_checkbox.html',
            scope: {
                label: '@',
                name: '=',
                options: '=',
                model: '=',
                req: '@'
            }
        }
    });
