/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formSelect', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.baseUrl + 'ng/common/form/views/select.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                options: '=',
                req: '@'
            }
        }
    });
