/**
 * Created by Sander on 24.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formTagsInput', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/form/views/tags_input.html',
            scope: {
                label: '@',
                model: '=',
                placeholder: '@',
                displayProperty: '@',
                autocompleteOnly: '@',
                autocompleteSource: '&'
            }
        }
    });
