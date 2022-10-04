<?php
include_once '../conection/connection.php';

class SqlLogin
{
  public $db;

  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }

  function getLogin($param)
  {

    $usuario = $param['login'];
    $senha = $param['senha'];

    $sql = "SELECT id_login
            FROM login
            WHERE BINARY usuario = '$usuario'
            AND senha = '$senha'";

    $query = $this->db->prepare($sql);
    $query->execute();
    if(($query) and ($query->rowCount() != 0)){
        return $query->fetchAll(PDO::FETCH_OBJ)[0];
    }else{
        return false;
    }
    
  }

}
