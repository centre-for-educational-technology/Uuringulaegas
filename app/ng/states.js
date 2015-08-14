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
    $urlRouterProvider.when('/group/{id:[0-9]{1,8}}', 'group/:id/view');
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
        url: '/inq_act',
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('inq_act.list', {
        url: "/list",
        templateUrl: base + 'ng/components/inq_act/views/inquiry_activity_list.html',
        controller: 'InquiryActivityListCtrl'
      })
      .state('inq_act.new', {
        url: "/new",
        templateUrl: base + 'ng/components/inq_act/views/add_inquiry_activity_form.html',
        controller: 'AddInquiryActivityCtrl'
      })
      .state('inq_act.details', {
        url: "/:id",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_detail_page.html',
        controller: 'InquiryActivityDetailPageCtrl'
      })
      .state('inq_act.search', {
        url: '/search',
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('inq_act.search.tags', {
        url: "/tags",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_tag_cloud.html',
        controller: 'InquiryActivityTagCloudCtrl'
      })


      .state('user', {
        url: '/user',
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('user.list', {
        url: '/list',
        templateUrl: base + 'ng/components/user/views/user_list.html',
        controller: 'UserListCtrl'
      })
      .state('user.register', {
        url: '/register',
        templateUrl: base + 'ng/components/user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .state('user.details', {
        url: '/:id',
        templateUrl: base + 'ng/components/user/views/user_passport.html',
        controller: 'UserPassportCtrl'
      })


      .state('group', {
        url: '/group',
        templateUrl: base + 'ng/components/main/views/parent_view.html'
      })
      .state('group.list', {
        url: '/list',
        templateUrl: base + 'ng/components/group/views/group_list.html',
        controller: 'GroupListCtrl'
      })
      .state('group.new', {
        url: '/new',
        templateUrl: base + 'ng/components/group/views/add_group.html',
        controller: 'AddGroupCtrl'
      })
      .state('group.detail', {
        url: '/:id',
        abstract: false,
        templateUrl: base + 'ng/components/group/views/group_page_parent.html',
        controller: 'GroupParentCtrl'
      })
      .state('group.detail.view', {
        url: '/view',
        templateUrl: base + 'ng/components/group/views/group_page_info.html',
        controller: 'GroupPageInfoCtrl'
      })
      .state('group.detail.edit', {
        url: '/edit',
        templateUrl: base + 'ng/components/group/views/group_page_edit.html',
        controller: 'EditGroupCtrl'
      })
      .state('group.detail.act', {
        url: '/activities',
        templateUrl: base + 'ng/components/group/views/group_page.html',
        controller: 'GroupPageActivitiesCtrl'
      });


    //$locationProvider.html5Mode(true);
  });
