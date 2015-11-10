/**
 * Created by Sander on 10.11.2015.
 */

angular.module('arkofinquiryApp')
.directive('spinner', function(appConfig){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.appBase + 'ng/common/directives/spinner/view.html'
        }
    });
