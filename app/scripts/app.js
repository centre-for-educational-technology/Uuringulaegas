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
    'ui-rangeSlider'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add_inq_act', {
        templateUrl: '../views/add_inquiry_activity_form.html',
        controller: 'InquiryActivitiesCtrl'
      })
      .when('/register', {
        templateUrl: '../views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    //$locationProvider.html5Mode(true);
  });
