(function(window, angular){
	"use strict";

	var app = angular.module('ejemplo', []);

	app.controller('bienvenida', function($scope, $rootScope){
		$scope.$watch('texto', function(){
			$rootScope.texto = $scope.texto;
		});
	});

	app.controller('usuarios', function($scope, usuariosFactory, $rootScope){
		
		$rootScope.$watch('texto', function(){
			$scope.texto = $rootScope.texto;
		});
		$scope.getUsers = function(e){
			console.log(e, e.target);
			usuariosFactory.get(function(data){
				$scope.$apply(function(){
					$scope.usuarios = data;
					$rootScope.usuarios = data;
				});
			});
		}
	});

	app.factory('usuariosFactory', function(){
		var Users = function(){};
		Users.prototype.get = function(callback) {
			callback = (typeof callback === 'function') ? callback  : function(){};

			new Vi({
				url: 'server/main.json',
				respuesta: 'objeto'
			}).server(callback);

			//$http.get('server/main.json').success(callback);
		};

		Users.prototype.set = function(data, callback) {
			return data;
		};

		return new Users();
	});

	app.factory('directivesFactory', function(){
		return {
			usuarios: "{{user.name}} <span class='red'>{{user.lastname}}</span>",
			perritos: "perritos"
		};
	});

	app.directive('usuario', function(directivesFactory){
		return {
			template: directivesFactory.usuarios
		}
	});

	app.directive('usuariotontito', function(directivesFactory){
		var j = {
			template: directivesFactory.usuarios,
			link: function(scope, element, attributes){
				var params = scope.$eval(attributes.usuariotontito);
				var usr = params.usr;
				if(usr.apellido === 'Mussa'){
					console.log(element);
					var span = element[0].getElementsByTagName('span')[0];
					span.className = 'blue';

				}
			}
		};

		return j;
	});
})(window, window.angular);