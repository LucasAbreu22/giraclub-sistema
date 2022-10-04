<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

include_once './sql.backup.php';

extract(json_decode(file_get_contents("php://input"), TRUE));

class Backup {

    private $sql;

    function __construct() {
        
        //instancia da class        
        $this->sql = new SqlBackup();
        $this->file_pointer = "bakup_giraclubedb.sql";
    }

    function confirmaSenha($param) {
        $call = $this->sql->confirmaSenha($param);

        if($call === 1){
            $call = 1;
        }else{
            $call = 0;
        }
        echo json_encode($call);
    }

    function importarBanco($param) {

        $call = $this->sql->importarBanco($param);
    }

    function exportarBanco() {

        $file = $this->file_pointer;

        //shell_exec("C:\\xampp\mysql\bin\mysqldump -u root giraclubedb > $file");
        shell_exec("mysqldump -u u251266015_giraclub --password=LRUeXLy+2Qn u251266015_giraclub > $file");
    }

    function excluirArquivo(){
        $file = $this->file_pointer;

        if (!unlink($file)) { 
            echo ("$file não pode ser deletado"); 
        } 
        else { 
            echo ("$file foi excluído com sucesso"); 
        } 
    }

}

$class = new Backup();
$class->$call(@$param);

