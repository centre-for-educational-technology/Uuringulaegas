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
  .config(function ($stateProvider, appConfig, $urlRouterProvider, $locationProvider) {

    var base = appConfig.appBase;

    // Default states for states with child states
    $urlRouterProvider.when('/teenused', 'teenused/jaotusvedu');
    $urlRouterProvider.when('/myyk', 'myyk/soidukid');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: base + 'ng/components/main/views/titlepage.html',
        controller: 'TitlePageCtrl'
      })
      .state('login', {
        url: "/login",
        templateUrl: base + 'ng/components/main/views/login.html',
        controller: 'LoginCtrl'
      })



      .state('inq_act', {
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('inq_act.list', {
        url: "/inq_act/list",
        templateUrl: base + 'ng/components/inq_act/views/inquiry_activity_list.html',
        controller: 'InquiryActivityListCtrl'
      })
      .state('inq_act.new', {
        url: "/inq_act/new",
        templateUrl: base + 'ng/components/inq_act/views/add_inquiry_activity_form.html',
        controller: 'AddInquiryActivityCtrl'
      })
      .state('inq_act.details', {
        url: "/inq_act/:id",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_detail_page.html',
        controller: 'InquiryActivityDetailPageCtrl'
      })
      .state('inq_act.search', {
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('inq_act.search.tags', {
        url: "/inq_act/search/tags",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_tag_cloud.html',
        controller: 'InquiryActivityTagCloudCtrl'
      })


      .state('user', {
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('user.list', {
        url: '/user/list',
        templateUrl: base + 'ng/components/user/views/user_list.html',
        controller: 'UserListCtrl'
      })
      .state('user.register', {
        url: '/user/register',
        templateUrl: base + 'ng/components/user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .state('user.details', {
        url: '/user/:id',
        templateUrl: base + 'ng/components/user/views/user_passport.html',
        controller: 'UserPassportCtrl'
      })


      .state('group', {
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('group.list', {
        url: '/group/list',
        templateUrl: base + 'ng/components/group/views/group_list.html',
        controller: 'GroupListCtrl'
      })
      .state('group.new', {
        url: '/group/new',
        templateUrl: base + 'ng/components/group/views/add_group.html',
        controller: 'AddGroupCtrl'
      })
      .state('group.detail', {
        url: '/group/:id',
        templateUrl: base + 'ng/components/group/views/group_page.html',
        controller: 'GroupPageCtrl'
      });

    //$locationProvider.html5Mode(true);
  });
