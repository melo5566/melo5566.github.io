var module = angular.module("myApp", ['ngRoute', 'ngAnimate']);

module.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home/', {
				templateUrl: 'home.html',
				controller: 'ShowController'
			}).
			when('/about/', {
				templateUrl: 'timeline.html',
				controller: 'ShowController'
			}).
			when('/sport/', {
				templateUrl: 'sport.html',
				controller: 'ShowController'
			}).
			when('/education/', {
				templateUrl: 'timeline.html',
				controller: 'ShowController'
			}).
			when('/projects/', {
				templateUrl: 'projects.html',
				controller: 'ShowController'
			}).
			when('/music/', {
				templateUrl: 'blog.html',
				controller: 'ShowController'
			}).
			when('/pchat/', {
				templateUrl: 'pchat.html',
				controller: 'ShowController'
			}).
			when('/create/', {
                templateUrl: 'hw7-create.html',
                controller: 'CreateController'
            }).
            when('/edit/', {
                templateUrl: 'hw7-edit.html',
                controller: 'EditController'
            }).
            when('/user/', {
                templateUrl: 'hw7-show.html',
                controller: 'UserController'
            }).
			otherwise({
				redirectTo: '/home/'
			});
	}]);


module.service('userService', function() {
    var users = [
    {id:1, fName:'Hege', lName:"Pege", title:"Engineer", sex:'Male', age:25 },
    {id:2, fName:'Kim',  lName:"Pim", title:"Software Engineer", sex:'Male', age:20 },
    {id:3, fName:'Sal',  lName:"Smith", title:"Director", sex:'Female', age:30 },
    {id:4, fName:'Jack', lName:"Jones", title:"Data Scientist", sex:'Male', age:28 },
    {id:5, fName:'John', lName:"Doe", title:"Engineer", sex:'Male', age:25 },
    {id:6, fName:'Peter',lName:"Pan", title:"Manager", sex:'Female', age:23 },
    {id:7, fName:'Kobe',lName:"Bryant", title:"Player", sex:'Male', age:38 },
    {id:8, fName:'Jay',lName:"Chou", title:"Singer", sex:'Male', age:36 }
    ];

    var userId = users.length;
    var editId = -1;

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
            users[getIndex(editId)] = user;
        },
        getEditId: function(id) {
            editId = id;
        },
        getEditUser: function() {
            return users[getIndex(editId)];
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
	    if (window.pageYOffset < 500) {
	    	document.getElementById(sports[0]+1).className = "active";
	    	document.getElementById(sports[1]+1).className = "";	
	    } else if (500 < window.pageYOffset && window.pageYOffset < 1200) {
	    	document.getElementById(sports[1]+1).className = "active";
	    	document.getElementById(sports[0]+1).className = "";
	    	document.getElementById(sports[2]+1).className = "";		
	    } else if (1200 < window.pageYOffset && window.pageYOffset < 1900) {
	    	document.getElementById(sports[2]+1).className = "active";
	    	document.getElementById(sports[1]+1).className = "";
	    	document.getElementById(sports[3]+1).className = "";		
	    } else if (1900 < window.pageYOffset && window.pageYOffset < 2600) {
	    	document.getElementById(sports[3]+1).className = "active";
	    	document.getElementById(sports[2]+1).className = "";
	    	document.getElementById(sports[4]+1).className = "";		
	    } else if (2600 < window.pageYOffset && window.pageYOffset < 3200) {
	    	document.getElementById(sports[4]+1).className = "active";
	    	document.getElementById(sports[3]+1).className = "";
	    	document.getElementById(sports[5]+1).className = "";		
	    } else if (window.pageYOffset > 3200) {
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
    $scope.orderBy = '';
    $scope.users = userService.getUsers();
    $scope.query = '';
    $scope.numPerPage = 5;
    $scope.currPage = 1;
    $scope.pages = [];
    $scope.reverse = false;

    for (var i = 0; i < Math.ceil($scope.users.length/$scope.numPerPage); i++)
        $scope.pages[i] = i+1;

    $scope.back = function() {
        $location.path("projects");
    };
    $scope.editUser = function(id) {
        userService.getEditId(id);
        $location.path('edit');
    };
    $scope.createUser = function() {
        $location.path('create');
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
})

module.controller("EditController", function($scope, $location, userService) {
    var user = userService.getEditUser();
    $scope.fName = user.fName;
    $scope.lName = user.lName;
    $scope.title = user.title;
    $scope.sex = user.sex;
    $scope.age = user.age;

    $scope.saveChange = function () {
        userService.editUser({id:user.id, fName:$scope.fName, lName:$scope.lName,
         title:$scope.title, age:$scope.age, sex:$scope.sex});
        $location.path('user');   
    }

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

module.controller("CreateController", function($scope, $location, userService) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.title = '';
    $scope.sex = '';
    $scope.age = null;

    $scope.saveChange = function() {
        userService.createUser({fName:$scope.fName, lName:$scope.lName,
         title:$scope.title, age:$scope.age, sex:$scope.sex});
        $location.path('user');
    };

    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('lName', function() {$scope.test();});
    $scope.$watch('title', function() {$scope.test();});
    $scope.$watch('age', function() {$scope.test();});
    $scope.$watch('sex', function() {$scope.test();});

    $scope.test = function() {
      $scope.error = false;
      $scope.incomplete = false;
      if (!$scope.fName.length ||
      !$scope.lName.length ||
      !$scope.title.length || $scope.age === null || !$scope.sex.length) {
         $scope.incomplete = true;
      }
    };
})
