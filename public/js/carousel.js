var app = angular.module('list_sculptures', ['slick']);

app.factory('sculptureListFactory', function($http){

  var getData = function(){
      return $http.get("/sculpture").then(function(result){
      return result.data;
  });  
  }

  return { getData: getData };
});


app.controller('SculptureListCtrl', function ($scope, sculptureListFactory) {

  $scope.sculptures = [];
  $scope.addImage = false;

  var sculpturePromise = sculptureListFactory.getData();

  sculpturePromise.then(function(result) {
    console.log("promise completed");
    var data = result;

    for(var i = 0; i < data.length; i++){
      console.log("pushing " + data[i].sculpture_name + " to sculptures");
      $scope.sculptures.push(data[i]); 
      console.log(data[i]);
    }
  });
});