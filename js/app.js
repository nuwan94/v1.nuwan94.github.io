
var app = angular.module("myCV", ["ngRoute", "ui.bootstrap"]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "about.html"
		})
		.when("/stats", {
			templateUrl: "stats.html"
		})
		.when("/resume", {
			templateUrl: "resume.html"
		})
		.when("/projects", {
			templateUrl: "projects.html"
		})
		.when("/contact", {
			templateUrl: "contact.html"
		})
		.otherwise({
			template: "<h1 class='mt-5'>404</h1><p>Not Found</p>"
		});
	$locationProvider.hashPrefix('');
});

app.filter('langConvert', function () {
	return function (t) {
		t = t.toLowerCase();
		var l;
		switch (t) {
			case "assembly":
				l = "devicons devicons-terminal";
				break;
			case "unity":
				l = "devicons devicons-unity_small";
				break;
			case "html":
				l = "devicon-html5-plain";
				break;
			case "css":
				l = "devicon-css3-plain";
				break;
			case "c++":
				l = "devicon-cplusplus-plain";
				break;
			case "c#":
				l = "devicon-csharp-plain";
				break;
			default:
				l = 'devicon-' + t + '-plain';
		}
		return l;
	}
});

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.filter('utcToLocal', function () {
	return function (d) {
		t = new Date(d)
		return (months[t.getMonth()] + " " + t.getFullYear());
	}
});

app.controller('projectCtrl', function ($scope, $filter, $http) {

	$scope.getApps = function () {
		$scope.isNotLoaded = true;
		$http.get("config/apps.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.projects = response.data;
				$scope.projects.title = "Mobile Applications";
			});
	}

	$scope.getWebs = function () {
		$scope.isNotLoaded = true;
		$http.get("config/web.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.projects = response.data;
				$scope.projects.title = "Web Applications";
			});
	}

	$scope.getGames = function () {
		$scope.isNotLoaded = true;
		$http.get("config/games.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.projects = response.data;
				$scope.projects.title = "Games & Simulations";
			});
	}

	$scope.getOpenSource = function () {
		$scope.isNotLoaded = true;
		$http.get("https://api.github.com/users/nuwan94/repos?page=1&per_page=100", {
			headers : {
				'Authorization': 'token 8839829dc369397acccc5c4778bc8389f72fd71f'
			}
		})
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.projects = response.data;
				$scope.projects.title = "Open Source Projects";
			});
	}

});


app.controller('resumeCtrl', function ($scope, $filter, $http) {

	$scope.showWork = function () {
		$scope.isNotLoaded = true;
		$http.get("config/work.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Working Experience";
			});
	}


	$scope.showEdu = function () {
		$scope.isNotLoaded = true;
		$http.get("config/edu.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Educational Quaification";
			});
	}

	$scope.showComm = function () {
		$scope.isNotLoaded = true;
		$http.get("config/comm.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Communities & Societies";
			});
	}

	$scope.showCont = function () {
		$scope.isNotLoaded = true;
		$http.get("config/cont.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Contests & Hackathons";
			});
	}

	$scope.showSkill = function () {
		$scope.isNotLoaded = true;
		$http.get("config/skill.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Skills";
			});
	}

	$scope.showTrain = function () {
		$scope.isNotLoaded = true;
		$http.get("config/train.json")
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resu = response.data;
				$scope.resu.title = "Trainings & Workshops";
			});
	}

});


app.controller('statCtrl', function ($scope, $filter, $http) {
	$scope.soLoaded = true;
	$scope.gitLoaded = true;

	$scope.getStat = function () {

			$http.get("https://api.github.com/users/nuwan94?client_id=825bdda0c89053fcd4ed&client_secret=fd737cee6549af66d686b4ab682e0bbca6862035")
				.then(function (response) {
					if (response.data.public_repos) {
						$scope.gh = response.data;
					}
					$scope.gitLoaded = true;
				});

			// $http.get("https://api.stackexchange.com/2.2/users/3125964?order=desc&sort=reputation&site=stackoverflow").then(function (response) {
			// 	if (response.data.items[0].reputation) {
			// 		$scope.so = response.data.items[0];
			// 	}
			// 	$scope.soLoaded = true;
			// });

	}

});
