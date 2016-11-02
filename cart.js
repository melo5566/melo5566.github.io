var myApp = angular.module('cartApp',['ngCart']);

var products = [{id:'0', singer:'Shawn Mendes',  name:'Illuminate', year:'2016', price:30, maxQuantity:6, img:'assets/img/projects/Cart/0.jpg'}, 
{id:'1', singer:'Charlie Puth', name:'Nine Track Mind', year:'2016', price:40, maxQuantity:10, img:'assets/img/projects/Cart/1.jpg'},
{id:'2', singer:'Justin Bieber', name:'Purpose', year:'2015', price:20, maxQuantity:10, img:'assets/img/projects/Cart/2.jpg'}, 
{id:'3', singer:'The Chainsmokers', name:'Closer', year:'2016', price:35, maxQuantity:8, img:'assets/img/projects/Cart/3.jpg'},
{id:'4', singer:'Alan Walker', name:'Faded', price:70, year:'2015', maxQuantity:8, img:'assets/img/projects/Cart/4.jpg'},
{id:'5', singer:'Maroon 5', name:'V', year:'2014', price:30, maxQuantity:8, img:'assets/img/projects/Cart/5.jpg'},
{id:'6', singer:'Lady Gaga', name:'Joanne', year:'2016', price:40, maxQuantity:20, img:'assets/img/projects/Cart/6.jpg'},
{id:'7', singer:'DJ Snake', name:'Encore', year:'2016', price:25, maxQuantity:20, img:'assets/img/projects/Cart/7.jpg'}]


myApp.controller("myCtrl", function($scope, $http, ngCart) {
	$scope.layout = 'Grid';
	$scope.products = products;
	$scope.nums = [];
	for (var i = 0; i <= Math.floor(products.length/4); i++) {
		$scope.nums.push(i);
	}
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
    $scope.changeLayout = function() {
    	if ($scope.layout === 'Grid')
    		$scope.layout = 'List';
    	else
    		$scope.layout = 'Grid';
    }

});
