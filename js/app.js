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

app.controller('projectCtrl', function ($scope, $http) {
	$scope.isLoaded = true;
	$http.get("https://api.github.com/users/nuwan94/repos?page=1&per_page=100")
		.then(function (response) {
			$scope.isLoaded = false;
			$scope.projects = response.data;
		});
});



// app.controller('projectCtrl', function ($scope, $http) {
// 	var url = "https://api.github.com/users/nuwan94/repos?page=1&per_page=100";

// 	$http.get(url).success(function (data) {
// 		$scope.projects = data;
// 	});
// });