//Model cadastro
var cadastro = {
    nome:       null,
    email:      null,
    condominio: null,
    cidade:     null,
    comentario: null,
    data_hora:  null,
}

var login = {
    email: "padaria1@padaria.com",
    senha: "padaria1",
    data_hora: null,
    mensagem: null
}

var usuario = null;

appControllers.controller('HomeController', ['$scope', '$routeParams', '$http', '$location', function ($scope,$routeParams,$http,$location) {

    //Definindo model Cadastro
    $scope.cadastro = cadastro;
    //Action save
    $scope.actionSaveCadastro = function(){
        $scope.cadastro.data_hora = getNow("datahora");

        var jsonCadastro = JSON.stringify($scope.cadastro);
        var url = 'http://minhaurl.com/?';
        $http.get(url+"cadastro="+jsonCadastro).success(function(data) {
            alert('enviou com sucesso!');
        });
    }//fim actionSaveCadastro

    //Definindo Model Login
    $scope.login = login;
    //Action login
    $scope.actionLogin = function(){
        //salva data hora
        $scope.login.data_hora = getNow("datahora");

        //consulta existencia do usuario, metodo post
        var url = 'data/users.json?';
        $http.get(url+"usuario="+login.email+"&senha="+login.senha)
            //request usuarios
            .success(function(data) {
                //testa se existe esse usuario
                usuario = findObjectInArray(data, "email", login.email);
                //testa match de senhas, se der errado redireciona
                if(usuario.senha == login.senha){
                    console.log(usuario.login);
                    //salva local
                    setData("usuario",JSON.stringify(usuario));
                    //redireciona para o controlador certo
                    switch (usuario.tipo){
                        case 'admin':
                            $location.path("/admin/index") ;
                            break;
                        case 'cliente':
                            $location.path("/user/index");
                            break;
                        case 'padaria':
                            $location.path("/padaria/index") ;
                            break;
                        default :
                            $scope.login.mensagem = "usuário ou senha inválidos";
                    }//fim switch
                }else{
                    $scope.login.mensagem = "usuário ou senha inválidos";
                }
            })
            //houve erro na requisição ao servidor
            .error(function(data) {
                $scope.login.mensagem = "houve um erro na requisição do servidor";
            });
    }//fim actionLogin

}]);//fim controller