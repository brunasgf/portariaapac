const app = angular.module('apacteca', [
    'ngRoute',
    'ngDialog',
    'ngAnimate',
    'toastr',
    'angularMoment'
])

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start
        return input.slice(start)
    }
});