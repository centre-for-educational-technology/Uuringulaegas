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
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-rangeSlider',
    'ui.bootstrap',
    'ui.select',
    'ui.router',
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
