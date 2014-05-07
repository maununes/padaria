
appControllers.controller('AdminController', ['$scope', '$routeParams', '$http', '$location', function ($scope,$routeParams,$http,$location) {
    $scope.usuario = JSON.parse(getData("usuario"));
    if(!$scope.usuario){
        $location.path("/");
    }
    $scope.label = label;

    //lista pedidos
    $scope.actionListarPedidos = function(id){
        var urlPedidos = 'data/pedidos.json?';
        $http.get(urlPedidos)
            //encontrou
            .success(function(data) {
                if(id){
                    $scope.pedido = findObjectInArray(data, "id", id);
                }else{
                    $scope.pedidos = data;
                }
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.mensagem = "houve um erro na requisição do servidor";
            });

    }//fim actionListarPedidos

    //lista clientes
    $scope.actionListarClientes = function(id){
        //get clientes e padarias
        var urlUsers = 'data/users.json?';
        $http.get(urlUsers)
            //encontrou
            .success(function(data) {
                if(id){
                    $scope.cliente = findObjectInArray(data, "id", id);
                }else{
                    $scope.clientes = findListInArray(data, "tipo", "cliente");
                }
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.mensagem = "houve um erro na requisição do servidor";
            });

    }//fim actionListarClientes

    //lista padarias
    $scope.actionListarPadarias = function(){
        //get clientes e padarias
        var urlUsers = 'data/users.json?';
        $http.get(urlUsers)
            //encontrou
            .success(function(data) {
                $scope.padarias = findListInArray(data, "tipo", "padaria");
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.mensagem = "houve um erro na requisição do servidor";
            });
    }//fim actionListarPadarias

    //lista condominios
    $scope.actionListarCondominios = function(){
        //get condominios
        var urlCond = 'data/condominios.json?';
        $http.get(urlCond)
            //encontrou
            .success(function(data) {
                $scope.condominios = data;
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.mensagem = "houve um erro na requisição do servidor";
            });
    }//fim actionListarCondominios

    //lista cardapios
    $scope.actionListarCardapios = function(){
        //get cardapios
        var urlCond = 'data/cardapios.json?';
        $http.get(urlCond)
            //encontrou
            .success(function(data) {
                $scope.cardapios = data;
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.mensagem = "houve um erro na requisição do servidor";
            });
    }//fim actionListarCondominios

    //admin/:controller/:action/:id
    $scope.controller = $routeParams.controller;
    $scope.action     = $routeParams.action;
    $scope.id         = $routeParams.id;
    //
    switch ($routeParams.controller){
        case "pedido":
            $scope.actionListarPedidos($routeParams.id);
            break;
        case "cliente":
            $scope.actionListarClientes($routeParams.id);
            break;
        case "padaria":
            $scope.actionListarPadarias($routeParams.id);
            break;
        case "condominio":
            $scope.actionListarCondominios($routeParams.id);
            break;
        case "cardapio":
            $scope.actionListarCardapios($routeParams.id);
            break;
    }
    //
    switch ($routeParams.controller){
        case "index":
            $scope.template = "views/admin-index.html";
            break;
        default :
            $scope.template = "views/admin-"+$routeParams.controller+"-"+$routeParams.action+".html";
            break;
    }

}]);//fim controller