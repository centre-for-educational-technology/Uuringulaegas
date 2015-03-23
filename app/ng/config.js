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
    baseUrl: '/' // Always end with a slash, ex. '/dir/subdir/'
  });
