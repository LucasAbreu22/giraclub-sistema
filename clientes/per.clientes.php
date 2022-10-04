<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.clientes.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Clientes {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlClientes();
    }

    function getClientes($param) {
        $call = $this->sql->getClientes($param);
        echo json_encode($call);
    }

    function setClientes($param) {
        $id_cliente = $param["id_cliente"];

        if($id_cliente === ""){

            $call = $this->sql->verificarDuplicidade($param);

            if($call === 1){
    
                echo 'CADASTRADO';
                return false;
            }
            
            $call = $this->sql->criarCliente($param);
            $call = $call->id_cliente;
        }else if($id_cliente >= 0){
            $call = $this->sql->editarCliente($param);
        }else{
            echo "ERRO";
            return false;
        }
        
        echo json_encode($call);
    }

    function deletarCliente($param){

        $call = $this->sql->deletarCliente($param);
        echo json_encode($call);
    }

}

$class = new Clientes();
$class->$call(@$param);

