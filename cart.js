var myApp = angular.module('cartApp',['ngCart']);

var products = [{id:'0', name:'htc 10', price:550, maxQuantity:6, img:'assets/img/projects/Cart/htc-10.png'}, 
{id:'1', name:'Asus ZF3', price:330, maxQuantity:10, img:'assets/img/projects/Cart/zf3.jpg'},
{id:'2', name:'HTC M8', price:400, maxQuantity:10, img:'assets/img/projects/Cart/m8.jpg'}, 
{id:'3', name:'HTC A9', price:300, maxQuantity:8, img:'assets/img/projects/Cart/a9.png'},
{id:'4', name:'Google Pixel', price:700, maxQuantity:8, img:'assets/img/projects/Cart/pixel.png'},
{id:'5', name:'Iphone 7', price:800, maxQuantity:8, img:'assets/img/projects/Cart/i7.jpg'},
{id:'6', name:'Xperia xz', price:300, maxQuantity:20, img:'assets/img/projects/Cart/xz.jpg'}]


myApp.controller("myCtrl", function($scope, $http, ngCart) {
	$scope.products = products;
	$scope.nums = [];
	for (var i = 0; i <= Math.floor(products.length/4); i++) {
		$scope.nums.push(i);
	}
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
});
