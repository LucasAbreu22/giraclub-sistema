<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.excel.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Excel {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlExcel();
    }

    function exemplo($param) {
        $call = $this->sql->exemplo($param);
        echo json_encode($call);
    }

    function validarDadosPlanilha($param) {

        foreach($param['excelRows'] as $linha){
            $id_cliente = '';
            $nome_cliente = trim(strtoupper($linha['NOME']));
            $telefone_cliente = trim($linha['TELEFONE']);
            $a_pagar = '';

            $id_campanha = '';
            $campanha = trim(strtoupper($linha['CAMPANHA']));
            $valor_campanha = $linha['VALOR'];
            $observacao = '';

            if(isset($linha['OBSERVACAO'])){
                $observacao = trim(strtoupper($linha['OBSERVACAO']));
            }

            if(mb_strpos($telefone_cliente, '(') === false && mb_strpos($telefone_cliente, ')') === false){
                $telefone_cliente = "(61) " . $telefone_cliente;

            }


            if(strpos($valor_campanha, 'R$') !== false){

                $valor_campanha = str_replace("R$", " ", $valor_campanha);
            }

            if(strpos($valor_campanha, ',') !== false){

                $valor_campanha = str_replace(",", "", $valor_campanha);

            }
            $valor_campanha = doubleval($valor_campanha);

            $verificacao_cliente = $this->sql->verificarCliente($nome_cliente, $telefone_cliente);
            $verificacao_campanha = $this->sql->verificarCampanha($campanha);

            if($verificacao_cliente === 0){
                $this->sql->adicionarCliente($nome_cliente, $telefone_cliente);
            }

            if($verificacao_campanha === 0){
                $this->sql->adicionarCampanha($campanha);

            }

            $cliente_attr = $this->sql->buscarCliente($nome_cliente, $telefone_cliente);
            $campanha_attr = $this->sql->buscarCampanha($campanha);

            foreach ($cliente_attr as $list_cliente){

                $id_cliente = $list_cliente->id_cliente;
                $a_pagar = $list_cliente->a_pagar;
            }

            foreach ($campanha_attr[0] as $list_campanha){

                $id_campanha = $list_campanha;
            }

            $valor_campanha = doubleval($valor_campanha);
            
            $a_pagar = doubleval($a_pagar);
            
            $a_pagar += $valor_campanha;

            $this->sql->relacionarClienteCampanha($id_campanha, $id_cliente, $valor_campanha, $observacao);
            $this->sql->atualizarCliente($id_cliente, $a_pagar);

        }

        echo json_encode("PLANILHA IMPORTADA COM SUCESSO!");
        
    }

}

$class = new Excel();
$class->$call(@$param);

