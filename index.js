Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

Array.prototype.unique = function(){
	return this.filter(function(item, pos, self) {
		return self.indexOf(item) == pos;
	});
};

var app = angular.module("mainApp",[]);
app.controller("DocumentController",["$scope",function ($scope) {

	$scope.docnum = 3;
	$scope.making = false;
	$scope.resultDocs = "";
	$scope.processDone = false;
	$scope.doc = Array( $scope.docnum );
	$scope.matrix = [];
	$scope.reserved = ['&','|','!'];
	
	$scope.newArray =  function ( ) {
		return new Array( $scope.docnum );
	}	

	$scope.dec2bin = function (dec){
		var s = (dec >>> 0).toString(2);
		var nar = new Array($scope.documentColumns.length-s.length +1);
		s = nar.join('0') + s
		return s;
	}
	
	$scope.apply = function(){
	$scope.documentColumns = [];
		// retrive tokens
		// $scope.making = true;
		$scope.allTokens = Array();
		for ( d in $scope.doc )
		{
			if( $scope.doc [d] && $scope.doc[d].name && $scope.doc [d].data )
			{
				$scope.documentColumns.push( $scope.doc[d].name );
				str = $scope.doc[ d ].data.replace(/\W/g, ' ');
				$scope.doc[d].tokens = str.split(" ").clean("").map(function(r){
				 								return r.toLowerCase()
											});
				$scope.allTokens = $scope.allTokens.concat($scope.doc[d].tokens);
			}
		}
		$scope.allTokens = $scope.allTokens.unique();
		// console.log( $scope.allTokens );
		$scope.allTokens.forEach(function(e, i){
			$scope.matrix[e] = new Array( $scope.documentColumns.length ).fill(0); 
		});
		$scope.allTokens.forEach(function(telm,i){
			
			for ( var did = 0 ; did < $scope.documentColumns.length ; did++){
					if( $scope.doc[did].tokens.indexOf(telm) != -1 ){
						$scope.matrix[ telm ][ did ] = 1;
					}
			}
			
		})
		$("#matrix_modal").modal();
		// console.dir($scope.matrix)
		$scope.compute ();
	}

	$scope.g = function( d ){
		var elm = $scope.matrix[d];
		if( elm ){
			return parseInt(elm.join(""), 2);
		}
		return parseInt(0,2);
	}
	$scope.log = function(d){
		return console.log(d);
	}
	$scope.compute = function(){
			var q = $scope.query.replace(/</g,"$scope.g('")
								.replace(/>/g,"') ")
								.replace(/!/g,"~").toLowerCase();
			$scope.result = $scope.dec2bin ( eval(q) ) ;
			var tmpDoc  = $scope.result.split('');
			for( var i = 0; i < tmpDoc.length; i++ ){
				if( tmpDoc[ i ] == 1 ){
					tmpDoc[ i ] = $scope.documentColumns[ i ];
				}else{
					tmpDoc[ i ] = "";
				}
			}
			$scope.resultDocs =  tmpDoc.clean("").join(", ");

			if ( $scope.resultDocs.trim() == "" )
			{
				$scope.resultDocs =	undefined;
			}
			// $("#")
			$scope.processDone = true;		
	}
}]);