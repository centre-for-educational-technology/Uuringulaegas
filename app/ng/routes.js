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

    var base = appConfig.appBase;
    $routeProvider
      .when('/', {
        templateUrl: base + 'ng/components/main/views/titlepage.html',
        controller: 'TitlePageCtrl'
      })
      .when('/login', {
        templateUrl: base + 'ng/components/main/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/inq_act/search/tags', {
        templateUrl: base + 'ng/components/inq_act/views/inq_act_tag_cloud.html',
        controller: 'InquiryActivityTagCloudCtrl'
      })
      .when('/inq_act/list', {
        templateUrl: base + 'ng/components/inq_act/views/inquiry_activity_list.html',
        controller: 'InquiryActivityListCtrl'
      })
      .when('/inq_act/new', {
        templateUrl: base + 'ng/components/inq_act/views/add_inquiry_activity_form.html',
        controller: 'AddInquiryActivityCtrl'
      })
      .when('/user/list', {
        templateUrl: base + 'ng/components/user/views/user_list.html',
        controller: 'UserListCtrl'
      })
      .when('/user/register', {
        templateUrl: base + 'ng/components/user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .when('/user/:id', {
        templateUrl: base + 'ng/components/user/views/user_passport.html',
        controller: 'UserPassportCtrl'
      })
      .when('/groups/list', {
        templateUrl: base + 'ng/components/group/views/group_list.html',
        controller: 'GroupListCtrl'
      })
      .when('/groups/new', {
        templateUrl: base + 'ng/components/group/views/add_group.html',
        controller: 'AddGroupCtrl'
      })
      .when('/groups/:id', {
        templateUrl: base + 'ng/components/group/views/group_page.html',
        controller: 'GroupPageCtrl'
      })
      .otherwise({
        redirectTo: base
      });
    //$locationProvider.html5Mode(true);
  });
