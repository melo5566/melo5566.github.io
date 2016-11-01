var module = angular.module("myApp", ['ngCart']);

module.service('userService', function() {
    var users = [
    {id:1, fName:'Hege', lName:"Pege", title:"Engineer", sex:'Male', age:25 },
    {id:2, fName:'Kim',  lName:"Pim", title:"Software Engineer", sex:'Male', age:20 },
    {id:3, fName:'Sal',  lName:"Smith", title:"Director", sex:'Female', age:30 },
    {id:4, fName:'Jack', lName:"Jones", title:"Data Scientist", sex:'Male', age:28 },
    {id:5, fName:'John', lName:"Doe", title:"Engineer", sex:'Male', age:25 },
    {id:6, fName:'Peter',lName:"Pan", title:"Manager", sex:'Female', age:23 },
    {id:7, fName:'Kobe',lName:"Bryant", title:"Player", sex:'Male', age:38 },
    {id:8, fName:'Jay',lName:"Chou", title:"Singer", sex:'Male', age:36 },
    {id:9, fName:'Peter',lName:"Wu", title:"Software Engineer", sex:'Male', age:25 }
    ];

    var userId = users.length;

    var getIndex = function(id) {
      for (var i = 0; i < users.length; i++) {
        if (id === users[i].id)
          return i;
      }
    }    

    return {
        getUsers: function() { return users; },
        createUser: function(user) {
            userId ++;
            user.id = userId;
            users.splice(0, 0, user);
        },
        deleteUser: function(id) {
            users.splice(getIndex(id), 1);
        },
        editUser: function(user) {
            users[getIndex(user.id)] = user;
        }
    };
})


module.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y - 80;
        }
    };
});

module.controller("ShowController", function($scope, $location, anchorSmoothScroll) {
	window.scrollTo(0, 0);
	var opQueue = [];
	var numQueue = [];
	$scope.point = false;
	$scope.state = null;
	$scope.num = '';
	$scope.operator = null;


	var sports = ['ice', 'baseball', 'judo', 'basketball', 'ski', 'bowling'];
	window.onscroll = function () {
	    if (window.pageYOffset < 1000) {
	    	document.getElementById(sports[0]+1).className = "active";
	    	document.getElementById(sports[1]+1).className = "";	
	    } else if (1000 < window.pageYOffset && window.pageYOffset < 1700) {
	    	document.getElementById(sports[1]+1).className = "active";
	    	document.getElementById(sports[0]+1).className = "";
	    	document.getElementById(sports[2]+1).className = "";		
	    } else if (1800 < window.pageYOffset && window.pageYOffset < 2500) {
	    	document.getElementById(sports[2]+1).className = "active";
	    	document.getElementById(sports[1]+1).className = "";
	    	document.getElementById(sports[3]+1).className = "";		
	    } else if (2500 < window.pageYOffset && window.pageYOffset < 3100) {
	    	document.getElementById(sports[3]+1).className = "active";
	    	document.getElementById(sports[2]+1).className = "";
	    	document.getElementById(sports[4]+1).className = "";		
	    } else if (3100 < window.pageYOffset && window.pageYOffset < 4000) {
	    	document.getElementById(sports[4]+1).className = "active";
	    	document.getElementById(sports[3]+1).className = "";
	    	document.getElementById(sports[5]+1).className = "";		
	    } else if (window.pageYOffset > 4000) {
	    	document.getElementById(sports[5]+1).className = "active";
	    	document.getElementById(sports[4]+1).className = "";
	    }
	};
	$scope.gotoElement = function (eID){
      	anchorSmoothScroll.scrollTo(eID);
      	
    };

	$scope.add = function(val) {
		if (val === "+" || val === "-" || val === "x" || val === "/") {
			$scope.point = false;
			$scope.operator = val;
			$scope.state = 'operator';
			numQueue.push($scope.num);
			opQueue.push(val);
			$scope.num = '';
		} else {
			$scope.operator = '';
			$scope.num += val;
			if (val === '.') {
				$scope.state = 'point';
				$scope.point = true;
			} else
				$scope.state = 'digit';	
		}
	}
	$scope.cancel = function() {
		$scope.state = null;
		$scope.num = '';
		$scope.operator = null;
		opQueue = [];
		numQueue = [];
		$scope.point = false;
	}
	$scope.sign = function() {
		$scope.num = String(parseFloat($scope.num) * -1);
	}
	$scope.equal = function() {
		$scope.state = 'digit';
		$scope.point = false;
		numQueue.push($scope.num);
		$scope.operator = null;
		var i = 0;
		while (i < opQueue.length) {
			var temp;
			if (opQueue[i] === 'x') {
				temp = parseFloat(numQueue[i])*parseFloat(numQueue[i+1]);
				opQueue.splice(i,1);
				numQueue[i+1] = String(temp);
				numQueue.splice(i, 1);
			} else if (opQueue[i] === '/') {
				temp = parseFloat(numQueue[i])/parseFloat(numQueue[i+1]);
				opQueue.splice(i,1);
				numQueue[i+1] = String(temp);
				numQueue.splice(i, 1);
			} else
				i ++;
		}
		i = 0;
		while (i < opQueue.length) {
			var temp;
			if (opQueue[i] === '+') {
				temp = parseFloat(numQueue[i])+parseFloat(numQueue[i+1]);
				opQueue.splice(i,1);
				numQueue[i+1] = String(temp);
				numQueue.splice(i, 1);
			} else {
				temp = parseFloat(numQueue[i])-parseFloat(numQueue[i+1]);
				opQueue.splice(i,1);
				numQueue[i+1] = String(temp);
				numQueue.splice(i, 1);
			}
		}
		$scope.num = numQueue.shift();
	}
})

module.controller("UserController", function($scope, $location, userService) {
    $scope.state = 'show';
    $scope.orderBy = '';
    $scope.users = userService.getUsers();
    $scope.query = '';
    $scope.numPerPage = 6;
    $scope.currPage = 1;
    $scope.pages = [];
    $scope.reverse = false;

    for (var i = 0; i < Math.ceil($scope.users.length/$scope.numPerPage); i++)
        $scope.pages[i] = i+1;

    $scope.editUser = function(user) {
        $scope.state = 'edit';
        $scope.id = user.id;
        $scope.fName = user.fName;
        $scope.lName = user.lName;
        $scope.title = user.title;
        $scope.sex = user.sex;
        $scope.age = user.age;
    };
    $scope.createUser = function() {
        $scope.fName = '';
        $scope.lName = '';
        $scope.title = '';
        $scope.sex = '';
        $scope.age = null;
        $scope.state = 'create';
        $scope.currPage = 1;
    }
    $scope.delete = function(id) {
        userService.deleteUser(id);
        if ($scope.users.length % $scope.numPerPage === 0)
            $scope.pages.pop() === $scope.currPage? $scope.currPage-- : 0;
    };
    $scope.sort = function(attr) {
        if (attr !== $scope.orderBy) {
            $scope.reverse = false;
            if (attr === 'age' || attr === 'id') {
                $scope.users.sort(function(a, b) {
                    return parseFloat(a[attr]) - parseFloat(b[attr]);
                });  
            } else {
                $scope.users.sort(function(a, b) {
                    return a[attr].localeCompare(b[attr]);
                });
            }
            $scope.orderBy = attr;
        } else {
            $scope.reverse ^= true;
            $scope.users.reverse();
        }
    };
    $scope.getPage = function (page) {
        $scope.currPage = page;
    };

    $scope.EditSaveChange = function() {
        userService.editUser({id:$scope.id, fName:$scope.fName, lName:$scope.lName,
         title:$scope.title, age:$scope.age, sex:$scope.sex});
        $scope.state = 'show';
    };

    $scope.CreateSaveChange = function() {
        userService.createUser({fName:$scope.fName, lName:$scope.lName,
         title:$scope.title, age:$scope.age, sex:$scope.sex});
        $scope.state = 'show';
    };

    $scope.createBack = function() {
        $scope.state = 'show';
    };

    $scope.editBack = function() {
        $scope.state = 'show';
    };

    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('lName', function() {$scope.test();});
    $scope.$watch('title', function() {$scope.test();});
    $scope.$watch('age', function() {$scope.test();});
    $scope.$watch('sex', function() {$scope.test();});

    $scope.test = function() {  
      $scope.error = false;   
      $scope.incomplete = false;
      if (!$scope.fName.length || !$scope.lName.length || 
      !$scope.title.length || $scope.age === null || !$scope.sex.length) {
         $scope.incomplete = true;
      }
    };
})



var products = [{id:'0', name:'htc 10', price:550, maxQuantity:6, img:'assets/img/projects/Cart/htc-10.png'}, 
    {id:'1', name:'Asus ZF3', price:330, maxQuantity:10, img:'assets/img/projects/Cart/zf3.jpg'},
    {id:'2', name:'HTC M8', price:400, maxQuantity:10, img:'assets/img/projects/Cart/m8.jpg'}, 
    {id:'3', name:'HTC A9', price:300, maxQuantity:8, img:'assets/img/projects/Cart/a9.png'},
    {id:'4', name:'Google Pixel', price:700, maxQuantity:8, img:'assets/img/projects/Cart/pixel.png'},
    {id:'5', name:'Iphone 7', price:800, maxQuantity:8, img:'assets/img/projects/Cart/i7.jpg'},
    {id:'6', name:'Xperia xz', price:300, maxQuantity:20, img:'assets/img/projects/Cart/xz.jpg'}]
module.controller("CartController", function($scope, $http, ngCart) {
    $scope.products = products;
    $scope.nums = [];
    for (var i = 0; i <= Math.floor(products.length/4); i++) {
        $scope.nums.push(i);
    }
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
})



myApp.controller("myCtrl", function($scope, $http, ngCart) {
    $scope.products = products;
    $scope.nums = [];
    for (var i = 0; i <= Math.floor(products.length/4); i++) {
        $scope.nums.push(i);
    }
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
});







