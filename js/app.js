var app = angular.module("myCV", ["ngRoute"]);

app.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "profile.html"
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
			template: "<h1>404</h1><p>Not Found</p>"
		});
});

app.filter('langConvert', function () {
	return function (t) {
		t = t.toLowerCase();
		switch (t) {
			case "html":
				return "html5";
			case "css":
				return "css3";
			case "c++":
				return "cplusplus";
			default:
				return t;
		}
	}
});

app.controller('projectCtrl', function ($scope, $filter, $http) {

	$scope.getProjects = function (url) {
		$scope.isLoaded = true;
		$http.get(url)
			.then(function (response) {
				$scope.isLoaded = false;
				$scope.projects = response.data;
			});
	}
});