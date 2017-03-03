var app = angular.module('app.home', ['firebase', 'ngRoute']);


app.controller('HomeCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   // Refs
   var clientRef = firebase.database().ref('clients');

   // synced DB
   $scope.clients = $firebaseArray(clientRef);

   // Data
   $scope.showDelete = false;
   $scope.showModal = false;
   $scope.newClient = {
      name: '',
   }

   // Methods
   $scope.addClient = function() {
      $scope.clients.$add($scope.newClient).then(function(ref) {
         console.log(ref);
         $scope.newClient = {
            name: ''
         };
      });
   }

   $scope.removeClient = function(id) {
      $scope.clients.$remove(id).then(function(ref) {
         console.log("Client Removed " + ref.key);
      });
   }

   $scope.clientModal = function() {
      $scope.showModal = !$scope.showModal;
   }

   $scope.edit = function() {
      $scope.showDelete = !$scope.showDelete;
   }

}]);
