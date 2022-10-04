<?php
include_once '../conection/connection.php';


class SqlExcel
{


  public $db;
  
  function __construct()
  {
    $this->db = ConexaoDB::getConectar();
  }


  function exemplo()
  {
    $sql = "SELECT * FROM produtos";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function buscarCliente($nome_cliente, $telefone)
  {

    $sql = "SELECT
            id_cliente, a_pagar 
            FROM clientes
            WHERE nome_cliente = '$nome_cliente'
            AND telefone = '$telefone'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function buscarCampanha($campanha)
  {

    $sql = "SELECT
            id_campanha
            FROM campanhas
            WHERE nome_campanha = '$campanha'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 
    
  }

  function verificarCliente($nome_cliente, $telefone)
  {

    $sql = "SELECT
            * FROM clientes
            WHERE nome_cliente = '$nome_cliente'
            AND telefone = '$telefone'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->rowCount(); 

  }

  function verificarCampanha($campanha)
  {

    $sql = "SELECT
            * FROM campanhas
            WHERE nome_campanha = '$campanha'";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->rowCount(); 
    
  }

  function adicionarCliente($nome_cliente, $telefone)
  {

    $sql = "INSERT INTO clientes (nome_cliente, telefone, a_pagar)
    VALUES ('$nome_cliente','$telefone', 0.00001)";

    $query = $this->db->prepare($sql);

    $query->execute();
  }

  function adicionarCampanha($campanha)
  {

    $sql = "INSERT INTO campanhas (nome_campanha)
    VALUES ('$campanha')";

    $query = $this->db->prepare($sql);

    $query->execute();

    
  }

  function atualizarCliente($id_cliente, $a_pagar){
    $sql = "UPDATE clientes
            SET a_pagar = $a_pagar
            WHERE id_cliente = $id_cliente";
    
    $query = $this->db->prepare($sql);
    $query->execute();
  }

  function relacionarClienteCampanha($id_campanha, $id_cliente, $valor_campanha, $observacao){

    $sql = "INSERT INTO  
            campanhas_clientes (id_campanha, id_cliente, valor_campanha, observacao) 
            VALUES ($id_campanha ,$id_cliente ,$valor_campanha ,'$observacao')";

    $query = $this->db->prepare($sql);

    $query->execute();
    
  }
}