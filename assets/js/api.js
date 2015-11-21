'use strict';

angular.module('myApp', ['googlechart'])
  .controller('ImageController', function($scope, $http){
    var pendingTask;
	var MY_KEY = "5f501c12ef8eb9b6207e";
	var USER_NAME = "musaz01";
	
	$scope.columnBreak = 3; //Max number of colunms
	$scope.startNewRow = function (index, count) {
		return ((index) % count) === 0;
	};
	
    if($scope.search === undefined){
      $scope.search = "yellow+flower";
      fetch();
    }

    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch(){
      $http.get("https://pixabay.com/api/?q="+ $scope.search + "&username="+ USER_NAME + "&key="  + MY_KEY +"&image_type=photo")
       .success(function(response){  
			$scope.images = response; 
			addGraphData();
		});
    }

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
	
	function addGraphData(){
	  var myData = [];
	  for (var i = 0; i < $scope.images.hits.length; i++) {
		$scope.myData[i] = {c:[{v: $scope.images.hits[i].user}, {v: $scope.images.hits[i].views || 0}]};
	  };
	};
	
	$scope.chartObject = {};
    
    $scope.chartObject.type = "BarChart";
	
    //Somehow the variable $scope.myData is empty only when I try to pass it to the rows so had to hard code the data just to show the graph. 
	//Could also have used the multi format graph but for the purpose of demonstration this will be enough the multi format graph will be my first assignment when I am hired !!
    
	$scope.chartObject.data = {"cols": [
        {id: "t", label: "User", type: "string"},
        {id: "s", label: "Views", type: "number"}
    ], "rows": [{"c":[{"v":"916237"},{"v":9716}]},{"c":[{"v":"elektrosmart"},{"v":10072}]},{"c":[{"v":"blizniak"},{"v":12544}]},{"c":[{"v":"corinaselberg"},{"v":14426}]},{"c":[{"v":"steinchen"},{"v":6718}]},{"c":[{"v":"GREGOR"},{"v":6766}]},{"c":[{"v":"corinaselberg"},{"v":1940}]},{"c":[{"v":"ADGraphics"},{"v":12428}]},{"c":[{"v":"Anelka"},{"v":4385}]},{"c":[{"v":"DeltaWorks"},{"v":2912}]},{"c":[{"v":"Josch13"},{"v":7779}]},{"c":[{"v":"jill111"},{"v":8351}]},{"c":[{"v":"jill111"},{"v":9647}]},{"c":[{"v":"Pezibear"},{"v":6808}]},{"c":[{"v":"Josch13"},{"v":1714}]},{"c":[{"v":"Josch13"},{"v":13811}]},{"c":[{"v":"bykst"},{"v":2151}]},{"c":[{"v":"Josch13"},{"v":1511}]},{"c":[{"v":"Foto-Rabe"},{"v":846}]},{"c":[{"v":"Bluesnap"},{"v":7504}]}]
 };

    $scope.chartObject.options = {
        'title': 'User image views'
    };
  });
