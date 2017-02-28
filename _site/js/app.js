//Pull in Angular: https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.2/angular.min.js
var proApp = angular.module('protarasApp',["ngRoute"],  function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    });

// add routing url for each pages
// to assign the template and controller
 
proApp.config(function($routeProvider, $locationProvider) { 
   // Starting Symbol
        //$interpolateProvider.startSymbol('[[');
        // Ending Symbol
        //$interpolateProvider.endSymbol(']]');
$locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
      }); 
  $routeProvider 
  .when("/", { 
    controller: 'protarasCtr'
  })
  .when("/hotel/:name", {
    templateUrl : "/hotel",
    controller: 'detailController' 
  })
  .otherwise({redirectTo:'/region-listing/'});  
}); 

// add dash(-hyphen) function in url
proApp.filter('spaceDash', function() {
   return function(input) {
       return input.replace(/ /g, '-');
   }
});

// main page controller to display the list of hotels in a region
proApp.controller('protarasCtrl',function($scope, $http){  
 $scope.tri = "ad"; 
    $http.get('https://rt3api-prd.ttaws.com/hotels/list.json?portal_id=TSOKKOS&rooms=1&locale=en').success(function(result){
      $scope.HotelLists = result.hotels; 
    }).error(function(data){ 
    });
});


//hotel detail page controller
 proApp.controller('detailController',function($scope, $routeParams, $http){ 
  var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
 var nameurl = filename.replace(/-/g, " ");
    $scope.search = function() {
            var url = 'https://rt3api-prd.ttaws.com/hotels/list.json?portal_id=TSOKKOS&rooms=1&locale=en';
            $http.get(url).success(httpSuccess).error(function() {
                //alert('Unable to get back informations :( ');
            });
        }
        httpSuccess = function(response) { 
            $scope.hotels = response.hotels;
            //alert($scope.name);
            var hoteldetail = $scope.hotels.filter(function(item){
             //return item.name==newStrUrl; // example with id 1, or routeParams.id
             return item.name==nameurl;
            });
            $scope.hotel = hoteldetail[0];  // remove extra square bracs
        } 
        $scope.search();
});

 