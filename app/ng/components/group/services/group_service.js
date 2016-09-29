/**
 * Created by Sander on 11.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("GroupService", function GroupFactory($resource, $http, appConfig, $rootScope){

  $http.defaults.headers.common['X-WP-Nonce'] = $rootScope.currentUserData.nonce;

  return $resource(appConfig.apiUrl + 'wp-json/pods/group/:id', {}, {
    query: {
      url: appConfig.apiUrl + 'wp-json/pods/group?data[limit]=-1',
      method: 'GET',
      isArray: true,
      transformResponse: [angular.fromJson, function(data, headers){
        console.log(data);
        return _.values(data); // Removes keys from response
      }]
    },
    getList:{
      url: appConfig.apiUrl + 'wp-admin/admin-ajax.php',
      method: 'GET',
      params: {
        action: 'get_group_list'
      },
      isArray: true
    },
    getFeed:{
      url: appConfig.apiUrl + 'wp-admin/admin-ajax.php?groupID=:id&page=:page',
      method: 'GET',
      groupID: '@id',
      page: '@page',
      params: {
        action: 'get_group_feed'
      },
      isArray: true
    },
    update: {
      method: 'PUT'
    },
    getGroupsBackgroundImage: {
      url: appConfig.apiUrl + 'wp-admin/admin-ajax.php',
      method: 'GET',
      params: {
        action: 'get_groups_background_image'
      },
      transformResponse: [angular.fromJson, function(data) {
        return {
          url: data.url
        };
      }]
    },
    handleWaitList: {
      url: appConfig.apiUrl + 'wp-admin/admin-ajax.php',
      method: 'POST',
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      }
    }
  });

});
