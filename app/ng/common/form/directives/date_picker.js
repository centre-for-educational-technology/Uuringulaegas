/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formDatePicker', function(){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: '/ng/common/form/views/date_picker.html',
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
            }
        }
    });