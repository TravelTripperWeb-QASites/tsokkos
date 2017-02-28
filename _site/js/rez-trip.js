(function() {
  angular
    .module('rezTrip', ['ui.date'], function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .value('rt3api', new Rt3Api({
      portalId: 'thepierreny',
      hotelId: 'NYCTP',
      defaultLocale: 'en',
      defaultCurrency: 'USD'
    }))
    .config(function($locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
      });
    })
    .filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };
})

    .directive('onSearchChanged', function (rt3Search) {
      return {
        scope: false,
        restrict: 'A',
        link: function (scope, element, attrs) {
          scope.$watch('search.params', function (params) {
            if (params.arrival_date && params.departure_date) {
              scope.$eval(attrs.onSearchChanged);
            }

          }, true);

          scope.$eval(attrs.onSearchChanged);
        }
      };
    })

    .controller('bookingWidget', ['$scope', 'rt3Search', 'rt3Browser', function($scope, rt3Search, rt3Browser) {
      var self = this;

      this.arrivalOptions = {
        minDate: 0
      }
      this.departureOptions = {
        minDate: 1
      }
      // Todo move to service
      this.chachgeMinDate = function(target) {
        var today = new Date().getDate();
        var arr = new Date($scope.search.params.arrival_date).getDate();
        var arrm = new Date($scope.search.params.arrival_date).getMonth();
        var gettonightstatus= rt3Browser.roomsTonight.length;
        if(gettonightstatus == 0)
        {
          $(".tonightrate").hide();
        }
        console.log(gettonightstatus);
        if (target == 'departure') {
         var dept= new Date($scope.search.params.arrival_date);
          var theDay=new Date(dept.setDate(dept.getDate() + 1));
          var newDay=theDay.toISOString().slice(0,10);
          $scope.search.params.departure_date=newDay;
          self.departureOptions.minDate=(theDay.getDate()-today);
          
          
        }  
      }

      

     this.convertDate = function(minLos,mon) {
      var date = new Date();
      var n = minLos || 0;

      if(mon==date.getMonth())
      {
        
      return date.getFullYear() +'-'+ ('0' + (date.getMonth() + 1)).slice(-2) +'-'+ ('0' + (date.getDate() + n)).slice(-2);
    }
    else
    {
       self.departureOptions.minDate=1; 
       return date.getFullYear() +'-'+ ('0' + (mon + 1)).slice(-2) +'-'+ ('0' + (date.getDate()+n)).slice(-2);



    }
    }
    }]);
})();
