<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.home.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Home {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlHome();
    }

    function exemplo($param) {
        $call = $this->sql->exemplo($param);
        echo json_encode($call);
    }

    function getDevedoresEQuitados($param) {

        $call = [];

        if($param['devedores'] === "DEVEDORES"){

            $devedores = $this->sql->getClientesDevedores($param);
            $call = array_merge($devedores, $call);
        }

        if($param['quitados'] === "QUITADOS"){

            $quitados = $this->sql->getClientesQuitados($param);
            $call = array_merge($call, $quitados);
        }

        if($param['devedores'] === "" && $param['quitados'] === ""){
            $devedores = $this->sql->getClientesDevedores($param);
            $call = array_merge($devedores, $call);

            $quitados = $this->sql->getClientesQuitados($param);
            $call = array_merge($call, $quitados);
           }

           $receber = $this->sql->somarAReceber();
           $call = array_merge($call, $receber);
        
        echo json_encode($call);
    }

    function getDevedoresCampanha($param) {

        $call = [];

        $call = $this->sql->getClientesDevedoresCampanha($param);

        $receber = $this->sql->somarAReceberCampanha($param);

        $call = array_merge($call, $receber);
        
        echo json_encode($call);
    }

    function getCampanhasCliente($param) {
        $call = $this->sql->getCampanhasCliente($param);
        $total_campanhas = $this->sql->somarCampanhas($param);

        $call = array_merge($call, $total_campanhas);

        echo json_encode($call);
    }

    function getPagamentosCliente($param) {
        $call = $this->sql->getPagamentosCliente($param);
        
        $total_pagamentos = $this->sql->somarPagamentos($param);

        $call = array_merge($call, $total_pagamentos);

        echo json_encode($call);
    }

    function getCampanhas($param) {
        $call = $this->sql->getCampanhas($param);
        echo json_encode($call);
    }

    function adicionarCampanha($param) {
        $call = $this->sql->adicionarCampanha($param);

        if($call){
            $call = $this->sql->alterarConta($param);
            if($call){
                $call = true;
            }
        }else{
            $call = false;
        }
        
        echo json_encode($call);
    }

    function adicionarPagamento($param) {

        $call = $this->sql->adicionarPagamento($param);

        if($call){
            $call = $this->sql->alterarConta($param);
            if($call){
                $call = true;
            }
        }else{
            $call = false;
        }
        
        echo json_encode($call);
    }

    function deletarCampanhaCliente($param) {
        $call = $this->sql->deletarCampanhaCliente($param);

        if($call){
            $call = $this->sql->alterarConta($param);
            if($call){
                $call = true;
            }
        }else{
            $call = false;
        }
        
        echo json_encode($call);
    }

    function deletarPagamentoCliente($param) {
        
        $call = $this->sql->deletarPagamentoCliente($param);

        if($call){
            $call = $this->sql->alterarConta($param);
            if($call){
                $call = true;
            }
        }else{
            $call = false;
        }
        
        echo json_encode($call);
    }

}

$class = new Home();
$class->$call(@$param);

