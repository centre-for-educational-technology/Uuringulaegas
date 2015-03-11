'use strict';

/**
 * @ngdoc overview
 * @name arkofinquiryApp
 * @description
 * # arkofinquiryApp
 *
 * Main module of the application.
 */
angular
  .module('arkofinquiryApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-rangeSlider',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/inq_act/new', {
        templateUrl: 'inq_act/views/add_inquiry_activity_form.html',
        controller: 'InquiryActivitiesCtrl'
      })
      .when('/groups/new', {
        templateUrl: 'inq_act/views/add_inquiry_activity_form.html',
        controller: 'InquiryActivitiesCtrl'
      })
      .when('/register', {
        templateUrl: 'user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //$locationProvider.html5Mode(true);
  });
