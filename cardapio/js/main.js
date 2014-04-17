var host = "http://localhost/angular";


//item controller
function ItemController($scope, $http){
	//
	$scope.itens = [];
	//puxar dados do arquivo json
	$http({method: 'GET', url: 'json/data.json'}).
		success(function(data, status, headers, config) {
			$scope.itens = data;
		}).
		error(function(data, status, headers, config) {
		
		});//fim http
	
	//inicializar
	$scope.acao = "";
	$scope.indiceItemSelecionado = -1;
	$scope.novoitem = new Object();
	$scope.novoitem.id        = null;
	$scope.novoitem.codigo    = "";
	$scope.novoitem.nome      = "";
	$scope.novoitem.descricao = "";
	$scope.novoitem.preco     = "";
	$scope.novoitem.subitens  = [];
		
	//Adicionar ou editar item
	$scope.salvar = function() {
		//Novo item
		if($scope.acao == "adicionar"){
			//obj do novo item
			var novoitem = new Object();
			novoitem.id        = $scope.gerarId();
			novoitem.codigo    = $scope.novoitem.codigo;
			novoitem.nome      = $scope.novoitem.nome;
			novoitem.descricao = $scope.novoitem.descricao;
			novoitem.preco     = $scope.novoitem.preco.replace(',','.');
			novoitem.subitens  = [];
			//adicionar ao array de itens
			$scope.itens.push(novoitem);
			$scope.limpar();
			//ir pro final da tela
			//window.scrollTo(0,document.body.scrollHeight+67);
		}else if($scope.acao == "editar"){//editar item
			//$scope.acao = "adicionar";
			//procurar pelo item
			var item = getElementById($scope.itens , $scope.novoitem.id);
			//criar item o mesmo id e atributos modificados
			var novoitem = new Object();
			novoitem.id        = item.id;
			novoitem.nome      = $scope.novoitem.nome;
			novoitem.codigo    = $scope.novoitem.codigo;
			novoitem.descricao = $scope.novoitem.descricao;
			novoitem.preco     = $scope.novoitem.preco.replace(',','.');
			novoitem.subitens  = $scope.novoitem.subitens;
			//salvar o item com o id procurado
			var id = getIndexById($scope.itens, item.id);
			$scope.itens[id] = novoitem;
			//$scope.limpar();
		}
	};//fim salvar
	
	//
	$scope.preencherCampos = function(){
		$scope.acao = "editar";
		$scope.novoitem.id        = this.item.id;
		$scope.novoitem.codigo    = this.item.codigo;
		$scope.novoitem.nome      = this.item.nome;
		$scope.novoitem.descricao = this.item.descricao;
		$scope.novoitem.preco     = this.item.preco;
	};//fim editar
	
	$scope.excluirItem = function(id) {
		var index = getIndexById($scope.itens, id);
		$scope.itens.splice(index,1);
		$scope.limpar();
	};
	
	$scope.adicionarSubItem = function(){
		alert('Ainda não disponível');
	};
	
	$scope.subirItem = function(id) {
		var index = getIndexById($scope.itens, id);
		$scope.itens = trocarElementoPeloAnterior($scope.itens, index);
		if(index != 0){
			$scope.indiceItemSelecionado--;
		}
	};
	
	$scope.descerItem = function(id) {
		var index = getIndexById($scope.itens, id);
		$scope.itens = trocarElementoPeloPosterior($scope.itens, index);
		if(index != ($scope.itens.length - 1)){
			$scope.indiceItemSelecionado++;
		}
	};
	
	//
	//Adicionar ou editar item
	$scope.limpar = function() {
		$scope.acao = "";
		$scope.indiceItemSelecionado = -1;
		$scope.novoitem = new Object();
		$scope.novoitem.id        = null;
		$scope.novoitem.codigo    = "";
		$scope.novoitem.nome      = "";
		$scope.novoitem.descricao = "";
		$scope.novoitem.preco     = "";
		$scope.novoitem.subitens  = [];
	};
	
	//item selecionado
	$scope.indiceItemSelecionado = -1;
	//
	$scope.itemClicado = function ($index) {
		$scope.indiceItemSelecionado = $index;
		//ir pro topo da tela
		window.scrollTo(0,0);
	};
	
	//
	$scope.gerarId = function(){
		return $scope.itens.length + 1;
	}
	
	$scope.gerarSubItemId = function(idPai){
		
	}
	
}//fim itemcontroller

//retorna o objeto do array, com o id procurado
function getElementById(arr, id){
        for(i in arr) {
            if(arr[i].id == id) {
                return arr[i];
            }
        }
		return null;
}//fim getElementById

//retorna o indice do objeto com o id procurado
function getIndexById(arr, id){
        for(i in arr) {
            if(arr[i].id == id) {
                return i;
            }
        }
		return null;
}//fim getIndexById

//
function isNull(input){
	if(input == undefined || input == null){
		return true;
	}else{
		return false;
	}
}

//
function isEmptyString(input){
	if(input.trim() == ""){
		return true;
	}else{
		return false;
	}
}

//
function trocarElementoPeloAnterior(arr, index){
    index = parseInt(index);
	if(index != 0){
		var aux = arr[index];
		arr[index] = arr[index-1];
		arr[index-1] = aux;
	}
	return arr;
}

//
function trocarElementoPeloPosterior(arr, index){
	index = parseInt(index);
	if(index != (arr.length - 1)){
		var aux = arr[index];
		arr[index] = arr[index+1];
		arr[index+1] = aux;
	}
	return arr;
}

function resize(){
	var padding = 50;
	var rightWidth = window.innerWidth - padding - 300;
	document.getElementById('right').style.width = rightWidth+"px";
}

var uid = (function(){var id=0;return function(){if(arguments[0]===0)id=0;return id++;}})();
