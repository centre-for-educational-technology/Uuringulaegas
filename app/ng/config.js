'use strict';

/**
 * @ngdoc config
 * @name arkofinquiryApp
 * @description
 * # arkofinquiryApp
 *
 * Config for the main app
 */
angular.module('arkofinquiryApp.config', [])
  .constant('appConfig', {
    appBase: '/', // Always end with a slash, ex. '/dir/subdir/'
    apiUrl: '/api/' // Location of Wordpress install
  });
