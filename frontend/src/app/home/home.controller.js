(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', 'RequestService', 'SessionService'];

    /* @ngInject */
    function HomeController($log, RequestService, SessionService) {
        var vm = this;
        vm.title = 'HomeController';

        vm.isActivateNameHotel = false;
        vm.isActivateNameStars = false;
        vm.seachHotelText = "";
        vm.isActivateMobileFilter = false;

        vm.activateHotelName = function()
        {
            vm.isActivateNameHotel = (vm.isActivateNameHotel) ? false : true
        };
        
        vm.activateHotelStars = function()
        {
            vm.isActivateNameStars = (vm.isActivateNameStars) ? false : true
        };

        vm.range = function(count){
            var ratings = []; 
            for (var i = 0; i < count; i++) {  ratings.push(i); }
            return ratings;
        };

        vm.returnIntPrice = function(value)
        {
            return humanizeNumber(parseInt(value));
        };

        function humanizeNumber(n) {
          n = n.toString()
          while (true) {
            var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, '$1.$2$3')
            if (n == n2) break
            n = n2
          }
          return n
        }

        vm.seachHotel = function()
        {
            var params = { name: vm.seachHotelText };
            vm.data = [];
            RequestService.getData('hotel/', params).then(function(res)
            {
                vm.data = res.data;
            }, function(err) { $log.error(err); });
        }

        vm.seachHotelByStars = function(starsNumber)
        {
            console.log(starsNumber);
            var targetElement = '.homeStarCheckbox input:not(#stars'+starsNumber+'), #allStars';
            console.log(targetElement);
            angular.element(targetElement).prop('checked', false);
            var params = { stars: starsNumber};
            vm.data = [];

            RequestService.getData('hotel/', params).then(function(res)
            {
                vm.data = res.data;
            }, function(err)
            {
                $log.error(err);
            });
        }

        vm.seachAllHotels = function(starsNumber)
        {
            var targetElement = '.homeStarCheckbox input';
            angular.element(targetElement).prop('checked', false);
            activate();
        };

        vm.activeFilterMobile = function()
        {
            vm.isActivateMobileFilter = (vm.isActivateMobileFilter) ? false : true
        };

        activate();

        function activate()
        {
            vm.data = [];
            RequestService.getData('hotels', {}).then(function(res)
            {
                vm.data = res.data;
                console.log(vm.data);

            }, function(err)
            {
                $log.error(err);
            });
        }
    }
})();