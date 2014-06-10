var app = angular.module('app', ['ngRoute','appControllers','ui.bootstrap']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            when('/sair', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).
            //modulo admin
            when('/admin/:controller', {
                templateUrl: 'views/admin.html',
                controller: 'AdminController'
            }).
            when('/admin/:controller/:action', {
                templateUrl: 'views/admin.html',
                controller: 'AdminController'
            }).
            when('/admin/:controller/:action/:id', {
                templateUrl: 'views/admin.html',
                controller: 'AdminController'
            }).
            //modulo padaria
            when('/padaria/:controller', {
                templateUrl: 'views/padaria.html',
                controller: 'PadariaController'
            }).
            when('/padaria/:controller/:action', {
                templateUrl: 'views/padaria.html',
                controller: 'PadariaController'
            }).
            when('/padaria/:controller/:action/:id', {
                templateUrl: 'views/padaria.html',
                controller: 'PadariaController'
            }).
            //modulo usuario
            when('/user/:controller', {
                templateUrl: 'views/user.html',
                controller: 'UserController'
            }).
            when('/user/:controller/:action', {
                templateUrl: 'views/user.html',
                controller: 'UserController'
            }).
            when('/user/:controller/:action/:id', {
                templateUrl: 'views/user.html',
                controller: 'UserController'
            }).
            //erro ou 404
            when('/error', {
                templateUrl: 'views/error.html'
            }).
            otherwise({
                redirectTo: '/views/error.html'
            });

    }]);

var label = {
    "pedido": {
        "id":               "Código",
        "cliente_id":       "Código do cliente",
        "condominio_id":    "Código do condomínio",
        "valor":            "Valor (R$)",
        "datahora_pedido":  "Hora do pedido",
        "datahora_entrega": "Hora da entrega",
        "itens":            "Itens",
        "observacao":       "Observação do cliente",
        "tipo":             "Tipo",
        "status":           "Status"
    },
    "cliente":{
        "id":            "Código",
        "nome":          "Nome",
        "email":         "Email"  ,
        "senha":         "Senha",
        "telefone":      "Telefone",
        "condominio_id": "Código do condomínio",
        "complemento":   "Complemento",
        "tipo":          "Tipo"
    },
    "padaria":{

    },
    "condominio":{

    },
    "cardapio":{

    }
};
