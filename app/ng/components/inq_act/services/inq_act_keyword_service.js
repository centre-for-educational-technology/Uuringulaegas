/**
 * Created by Sander on 4.03.2015.
 */

angular.module("arkofinquiryApp")
.factory("InquiryActivityKeywordService", function InquiryActivityKeywordFactory($resource, $http, appConfig){
        $http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
        return $resource(appConfig.apiUrl + 'wp-json/pods/inq_keywords/:id', {}, {
                query: {
                        method: 'GET',
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                        return _.values(data); // Removes keys from response
                        }]
                },
                queryKeywordsByName: {
                        url: appConfig.apiUrl + 'wp-json/pods/inq_keywords?data[where]=name%20LIKE%20%22%25:searchName%25%22',
                        searchName: '@searchName',
                        method: "GET",
                        isArray: true,
                        transformResponse: [angular.fromJson, function(data, headers){
                                return _.values(data); // Removes keys from response
                        }]
                }
        });

});
