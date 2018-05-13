const roures = angular.module('apacteca')

roures.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/portaria", {
            templateUrl: "views/portaria/index.html"
        })
        .when("/historico", {
            templateUrl: "views/historico/index.html"
        })
        .otherwise({
            templateUrl: "views/home.html"
        })
})