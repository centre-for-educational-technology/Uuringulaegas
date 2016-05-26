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
    $urlRouterProvider.when('/user/', '/');

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
      .state('help', {
        url: "/help",
        templateUrl: base + 'ng/components/main/views/help.html',
        controller: 'HelpPageCtrl'
      })
      .state('badge', {
        url: "/badge/:key",
        templateUrl: base + 'ng/components/main/views/badge_info.html',
        controller: 'BadgeInfoCtrl'
      })




      .state('inq_act', {
        url: '/inq_act',
        templateUrl: base + 'ng/components/main/views/parent_view.html',
        authenticate: true
      })
      .state('inq_act.main', {
        templateUrl: base + 'ng/components/inq_act/views/inq_act_parent_view.html',
        controller: 'InquiryActivityParentCtrl',
        authenticate: true
      })
      .state('inq_act.main.list', {
        url: "/list",
        templateUrl: base + 'ng/components/inq_act/views/inquiry_activity_list.html',
        controller: 'InquiryActivityListCtrl',
        authenticate: true
      })
      .state('inq_act.main.new', {
        url: "/new",
        templateUrl: base + 'ng/components/inq_act/views/add_inquiry_activity_form.html',
        controller: 'AddInquiryActivityCtrl',
        authenticate: true
      })
      .state('inq_act.details', {
        url: "/:id",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_detail_page.html',
        controller: 'InquiryActivityDetailPageCtrl',
        authenticate: true
      })
      .state('inq_act.main.search', {
        url: '/search',
        abstract: true,
        templateUrl: base + 'ng/components/main/views/parent_view.html',
        authenticate: true
      })
      .state('inq_act.main.search.tags', {
        url: "/tags",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_tag_cloud.html',
        controller: 'InquiryActivityTagCloudCtrl',
        authenticate: true
      })
      .state('inq_act.main.search.search', {
        url: "/search",
        templateUrl: base + 'ng/components/inq_act/views/inq_act_search_form.html',
        controller: 'InquiryActivitySearchCtrl',
        authenticate: true
      })


      .state('user', {
        url: '/user',
        templateUrl: base + 'ng/components/main/views/parent_view.html',
        authenticate: true
      })
      .state('user.list', {
        url: '/list',
        templateUrl: base + 'ng/components/user/views/user_list.html',
        controller: 'UserListCtrl',
        authenticate: true
      })
      .state('user.register', {
        url: '/register',
        templateUrl: base + 'ng/components/user/views/user_register.html',
        controller: 'UserRegisterCtrl'
      })
      .state('user.edit', {
        url: '/edit',
        templateUrl: base + 'ng/components/user/views/user_edit_parent_view.html',
        authenticate: true
      })
      .state('user.edit.profile', {
        url: '/profile',
        templateUrl: base + 'ng/components/user/views/user_edit.html',
        controller: 'UserEditCtrl',
        authenticate: true,
        params: {
          forced: null
        }
      })
      .state('user.edit.extra', {
        url: '/extra',
        templateUrl: base + 'ng/components/user/views/user_survey.html',
        controller: 'UserSurveyCtrl',
        authenticate: true,
        params: {
          forced: null
        }
      })
      .state('user.details', {
        url: '/:id',
        templateUrl: base + 'ng/components/user/views/user_passport.html',
        controller: 'UserPassportCtrl',
        authenticate: true
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: base + 'ng/components/user/views/user_survey.html',
        controller: 'UserSurveyCtrl',
        authenticate: true
      })


      .state('group', {
        url: '/group',
        templateUrl: base + 'ng/components/main/views/parent_view.html',
        authenticate: true
      })
      .state('group.main', {
        templateUrl: base + 'ng/components/group/views/group_parent_view.html',
        controller: 'GroupParentCtrl',
        authenticate: true
      })
      .state('group.main.list', {
        url: '/list',
        templateUrl: base + 'ng/components/group/views/group_list.html',
        controller: 'GroupListCtrl',
        authenticate: true
      })
      .state('group.main.new', {
        url: '/new',
        templateUrl: base + 'ng/components/group/views/add_group.html',
        controller: 'AddGroupCtrl',
        authenticate: true
      })
      .state('group.main.hallOfFame', {
        url: '/halloffame',
        templateUrl: base + 'ng/components/group/views/hall_of_fame.html',
        controller: 'HallOfFameCtrl',
        authenticate: true
      })
      .state('group.detail', {
        url: '/:id',
        abstract: false,
        templateUrl: base + 'ng/components/group/views/group_detail_page_parent.html',
        controller: 'GroupParentCtrl',
        authenticate: true
      })
      .state('group.detail.view', {
        url: '/view',
        templateUrl: base + 'ng/components/group/views/detail_page_views/group_page_info.html',
        controller: 'GroupPageInfoCtrl',
        authenticate: true
      })
      .state('group.detail.comments', {
        url: '/comments',
        templateUrl: base + 'ng/components/group/views/detail_page_views/group_page_comments.html',
        controller: 'GroupCommentsCtrl',
        authenticate: true
      })
      .state('group.detail.edit', {
        url: '/edit',
        templateUrl: base + 'ng/components/group/views/detail_page_views/group_page_edit.html',
        controller: 'EditGroupCtrl',
        authenticate: true
      })
      .state('group.detail.act', {
        url: '/activities',
        templateUrl: base + 'ng/components/group/views/detail_page_views/group_page_activities.html',
        controller: 'GroupPageActivitiesCtrl',
        authenticate: true
      });


    //$locationProvider.html5Mode(true);
  })
  .run(function ($rootScope, $state, $timeout) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if(!$rootScope.userLoaded) {
        $timeout(checkAuth, 1000)
      } else {
        checkAuth();
      }

      function checkAuth() {
        if (toState.authenticate && !$rootScope.loggedIn && $rootScope.userLoaded){
          // User isn’t authenticated
          $state.transitionTo("login");
          event.preventDefault();
        }
      }

    });
  });
