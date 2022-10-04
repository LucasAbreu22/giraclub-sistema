<?php
include_once '../conection/connection.php';


class SqlBackup
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }


  function confirmaSenha($senha)
  {
    $sql = "SELECT 
            * 
            FROM login
            WHERE BINARY senha = '$senha'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->rowCount(); 

  }

  function importarBanco($param){

    $arquivo = $_POST['arquivo'];

    list($tipo, $dados) = explode(';', $arquivo);

    list(, $dados) = explode(',', $dados);

    $dados = base64_decode($dados);

    file_put_contents("./bakup_giraclubedb.sql", $dados);
  }

}