
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
			template : "<h1>404</h1><p>Not Found</p>"
		});
});