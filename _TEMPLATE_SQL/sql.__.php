<?php
include_once '../conection/connection.php';


class Sql__
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }


  function exemplo()
  {
    $sql = 'select * from produtos';

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }
}