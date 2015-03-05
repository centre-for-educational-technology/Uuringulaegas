/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formTextarea', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/views/directives/form/textarea.html',
            scope: {
                id: '@',
                label: '@',
                rows: '=',
                model: '=',
                req: '@'
            }
        }
    });