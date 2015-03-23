/**
 * Created by Sander on 4.03.2015.
 */

angular.module('arkofinquiryApp')
.directive('formSelectMultiple', function(appConfig, $compile){
        return {
            replace: true,
            restrict: 'E',
            templateUrl: appConfig.baseUrl + 'ng/common/form/views/select_multiple.html',
            scope: {
                label: '@',
                model: '=',
                options: '=',
                req: '@'
            },
            link: function(scope, element, attrs, InquiryActivitiesCtrl){
                scope.addChoice = function() {
                    scope.model.push('');
                    // scope.filteredOptions = _.difference(scope.options, scope.model);
                };

                scope.removeChoice = function(el){
                    scope.model.splice(el, 1);
                };
            }
        }
    });
