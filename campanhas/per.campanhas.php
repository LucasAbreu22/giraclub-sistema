<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.campanhas.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Campanha {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlCampanha();
    }

    function getCampanhas($param) {
        $call = $this->sql->getCampanhas($param);
        echo json_encode($call);
    }

    function verificarDuplicidade($param) {
        $call = $this->sql->verificarDuplicidade($param);
        echo json_encode($call);
    }

    function setCampanhas($param) {
        $id_campanha = $param["id_campanha"];

        if($id_campanha === ""){
            $call = $this->sql->verificarDuplicidade($param);

            if($call === 1){
    
                echo 'CADASTRADO';
                return false;
            }
            
            $call = $this->sql->criarCampanha($param);
            $call = $call->id_campanha;
        }else if($id_campanha >= 0){
            $call = $this->sql->editarCampanha($param);
        }else{
            echo "ERRO";
            return false;
        }
        
        echo json_encode($call);
    }

    function deletarCampanha($param){

        $call = $this->sql->deletarCampanha($param);
        echo json_encode($call);
    }

}

$class = new Campanha();
$class->$call(@$param);

