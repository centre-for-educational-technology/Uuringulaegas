'use strict';

/**
 * @ngdoc config
 * @name arkofinquiryApp.config
 * @description
 * # arkofinquiryApp.config
 *
 * Config module for the main app
 */
angular.module('arkofinquiryApp.config', [])
  .constant('appConfig', {
    appBase: '/', // Always end with a slash, ex. '/dir/subdir/'
    apiUrl: '/api/' // Location of Wordpress install
  })
;
