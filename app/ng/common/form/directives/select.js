/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formSelect', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/ng/common/form/views/select.html',
            scope: {
                id: '@',
                label: '@',
                model: '=',
                options: '=',
                req: '@'
            }
        }
    });