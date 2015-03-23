/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formRangeSlider', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/range_slider.html',
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
