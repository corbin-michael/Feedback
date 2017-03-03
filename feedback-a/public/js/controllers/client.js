var app = angular.module('app.client', ['firebase']);

function removeEmptyString(value) {
   if (value != '' || value != null) {
      return value
   }
}

app.controller('ClientCtrl', ['$scope', '$route', '$routeParams', '$firebaseArray', '$firebaseObject', function($scope, $route, $routeParams, $firebaseArray, $firebaseObject) {
   // Refs
   var db = firebase.database().ref('clients');
   var clientRef = firebase.database().ref('clients').child($routeParams.clientId);
   var issueListRef = clientRef.child('issueList');

   clientRef.once('value').then(function(snapshot) {
       $scope.clientName = snapshot.val().name;
   });

   // synced with DB
   $scope.client = $firebaseArray(clientRef);
   $scope.issueList = $firebaseArray(issueListRef);

   // Data
  $scope.section_title = "";
  $scope.tempIssue = "";
  $scope.tempIssueList = [];

  // $scope.sectionToSave = {
  //   sectionTitle: $scope.section_title,
  //   issues: $scope.tempIssueList
  // };

   // Methods
   $scope.addIssue = function() {
      // $scope.issue.pagesFound = $scope.issue.pagesFound.filter(function(e) {
      //    return e;
      // });
      // $scope.issue.browsersFound = $scope.issue.browsersFound.filter(function(e) {
      //     return e;
      // });

      // console.log("SectionToSave: ", $scope.sectionToSave);
      console.log("SectionTitle: ", $scope.section_title);
      console.log("temp issue: ", $scope.tempIssue);
      console.log("temp issue list: ", $scope.tempIssueList);

      $scope.issueList.$add(
        {
          sectionTitle: $scope.section_title,
          issues: $scope.tempIssueList,
          date: firebase.database.ServerValue.TIMESTAMP
        }
      ).then(function(ref) {
        // clear out model data
         $scope.section_title = "";
         $scope.tempIssue = "";
         $scope.tempIssueList = [];
      });
   }

   $scope.addTempItem = function() {
     $scope.tempIssueList.push($scope.issue);
     $scope.issue = "";
   }

   $scope.removeTempItem = function(key) {
     $scope.tempIssueList.splice(key, 1);
   }

   $scope.deleteSection = function(section) {
     $scope.issueList.$remove(section).then(function(ref) {
       console.log("deleted");
     });
   }

   $scope.preventSubmit = function($event) {
     $event.preventDefault();
   }

}]);
