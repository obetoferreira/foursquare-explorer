angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// Dismiss Function
	$scope.dismiss = function(target){
		var elNode = document.querySelectorAll(target);
		for (var i = 0; i < elNode.length; i++) {
			var el = elNode[i];
			el.className += ' animated fadeOutUp';

			setTimeout(function(){
				el.parentNode.removeChild(el);
			}, 700);
		}
	}
	
	// Raise Function
	$scope.raise = function(target){
		var elNode = document.querySelectorAll(target);
		for (var i = 0; i < elNode.length; i++) {
			var el = elNode[i];
			el.classList.remove('hide');
			el.className += ' animated fadeInUp';
		}
	}

});