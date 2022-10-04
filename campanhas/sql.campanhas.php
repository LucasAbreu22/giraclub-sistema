<?php
include_once '../conection/connection.php';


class SqlCampanha
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }


  function exemplo()
  {
    $sql = "select * from produtos";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(); 

  }
  
  function getCampanhas($param)
  {
    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT * 
            FROM campanhas
            WHERE nome_campanha LIKE '%$search%'
            ORDER BY id_campanha DESC
            LIMIT $offset, 20";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function verificarDuplicidade($param)
  {
    $nome_campanha = $param['nome_campanha'];

    $sql = "SELECT * 
            FROM campanhas
            WHERE nome_campanha = '$nome_campanha'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->rowCount(); 

  }

  function criarCampanha($param){

    $nome_campanha = $param['nome_campanha'];

    $sql = "INSERT INTO campanhas (nome_campanha)
            VALUES ('$nome_campanha')";

    $query = $this->db->prepare($sql);

    if($query->execute()){

      $sql = "SELECT MAX(id_campanha) as id_campanha FROM campanhas";

      $query = $this->db->prepare($sql);
      $query->execute();
      return $query->fetchAll(PDO::FETCH_OBJ)[0];
    }

  }

  function editarCampanha($param){

    $id_campanha = $param['id_campanha'];
    $nome_campanha = $param['nome_campanha'];

    $sql = "UPDATE campanhas 
            SET nome_campanha = '$nome_campanha'
            WHERE id_campanha = $id_campanha";

    $query = $this->db->prepare($sql);

    if($query->execute()){
        return "EDITADO";
    }
  }

  function deletarCampanha($param){
    

    $sql = "DELETE FROM campanhas
            WHERE id_campanha = $param";

    $query = $this->db->prepare($sql);
    if($query->execute()){
      return 1;
    }
  }

}