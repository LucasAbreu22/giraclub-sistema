<?php
include_once '../conection/connection.php';

class SqlClientes
{
  public $db;
  
  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }


  function getClientes($param)
  {

    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT * 
            FROM clientes
            WHERE nome_cliente LIKE '%$search%'
            ORDER BY nome_cliente ASC
            LIMIT $offset, 15";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
  }

  function verificarDuplicidade($param)
  {
    $nome_cliente = $param['nome_cliente'];
    $telefone = $param['telefone'];

    $sql = "SELECT * 
            FROM clientes
            WHERE nome_cliente = '$nome_cliente'
            AND telefone = '$telefone'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->rowCount(); 

  }

  function criarCliente($param){

    $nome_cliente = $param['nome_cliente'];
    $telefone = $param['telefone'];

    $sql = "INSERT INTO clientes (nome_cliente, telefone, a_pagar)
            VALUES ('$nome_cliente','$telefone', 0.00001)";

    $query = $this->db->prepare($sql);

    if($query->execute()){

      $sql = "SELECT MAX(id_cliente) as id_cliente FROM clientes";

      $query = $this->db->prepare($sql);
      $query->execute();
      return $query->fetchAll(PDO::FETCH_OBJ)[0];
    }

  }

  function editarCliente($param){

    $id_cliente = $param['id_cliente'];
    $nome_cliente = $param['nome_cliente'];
    $telefone = $param['telefone'];

    $sql = "UPDATE clientes 
            SET nome_cliente = '$nome_cliente', telefone = '$telefone'
            WHERE id_cliente = $id_cliente";

    $query = $this->db->prepare($sql);

    if($query->execute()){
        return "EDITADO";
    }
  }

  function deletarCliente($param){
    

    $sql = "DELETE FROM clientes
            WHERE id_cliente = $param";

    $query = $this->db->prepare($sql);
    if($query->execute()){
      return 1;
    }
  }
}