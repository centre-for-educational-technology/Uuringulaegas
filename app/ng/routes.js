'use strict';

/**
 * @ngdoc overview
 * @name arkofinquiryApp.config
 * @description
 * # arkofinquiryApp
 *
 * Routing config for the main app.
 */
angular.module('arkofinquiryApp')
  .config(function ($routeProvider, appConfig, $locationProvider) {
    var base = appConfig.baseUrl;
    $routeProvider
      .when('/', {
        templateUrl: base + 'ng/components/main/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/inq_act/new', {
        templateUrl: base + 'ng/components/inq_act/views/add_inquiry_activity_form.html',
        controller: 'InquiryActivitiesCtrl'
      })
      .when('/groups/new', {
        templateUrl: base + 'ng/components/group/views/add_group.html',
        controller: 'AddGroupCtrl'
      })
      .when('/register', {
        templateUrl: base + 'ng/components/user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .otherwise({
        redirectTo: base
      });
    //$locationProvider.html5Mode(true);
  });
