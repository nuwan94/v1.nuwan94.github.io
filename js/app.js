var app = angular.module("myCV", ["ngRoute"]);

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
				l = 'devicon-'+ t + '-plain';
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

	$scope.getProjects = function (url) {
		$scope.isNotLoaded = true;
		$http.get(url)
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.projects = response.data;
			});
	}

});


app.controller('resumeCtrl', function ($scope, $filter, $http) {

	$scope.getResume = function (url) {
		$scope.isNotLoaded = true;
		$http.get(url)
			.then(function (response) {
				$scope.isNotLoaded = false;
				$scope.resume = response.data[0];
				$scope.showWork();
			});
	}

	$scope.showWork = function () {
		$scope.resu = $scope.resume.working;
		$scope.resu.title = "Working Experience";
	}

	$scope.showEdu = function () {
		$scope.resu = $scope.resume.education;
		$scope.resu.title = "Educational Quaification";
	}

	$scope.showComm = function () {
		$scope.resu = $scope.resume.communities;
		$scope.resu.title = "Communities & Societies";
	}

	$scope.showCont = function () {
		$scope.resu = $scope.resume.contest;
		$scope.resu.title = "Contests & Hackathons";
	}

});


app.controller('statCtrl', function ($scope, $filter, $http) {
	$scope.soLoaded = false;
	$scope.gitLoaded = false;

	$scope.getStat = function () {

		$http.get("https://api.github.com/users/nuwan94")
			.then(function (response) {
				if (response.data.public_repos) {
					$scope.gh = response.data;
				}
				$scope.gitLoaded = true;
			});

		$http.get("https://api.stackexchange.com/2.2/users/3125964?order=desc&sort=reputation&site=stackoverflow").then(function (response) {
			if (response.data.items[0].reputation) {
				$scope.so = response.data.items[0];
			}
			$scope.soLoaded = true;
		});

	}

});