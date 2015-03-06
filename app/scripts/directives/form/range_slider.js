/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formRangeSlider', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/views/directives/form/range_slider.html',
            scope: {
                id: '@',
                label: '@',
                min: '=',
                max: '=',
                modelFrom: '=',
                modelTo: '=',
                req: '@'
            }
        }
    });