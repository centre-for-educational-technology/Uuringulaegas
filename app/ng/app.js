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
    'arkofinquiryApp.config',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-rangeSlider',
    'ui.bootstrap',
    'ui.select',
    'ngTagsInput',
    'Gravatar',
    'duScroll',
    'angular-jqcloud',
    'angularMoment'
  ])
  // Default values for angular-scroll module
  .value('duScrollDuration', 1000)
  .value('duScrollOffset', 30)
;
