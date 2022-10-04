<?php
include_once '../conection/connection.php';


class SqlHome
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
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getClientesDevedores($param)
  {
    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT 
            id_cliente, nome_cliente, 
            telefone, a_pagar 
            FROM clientes 
            WHERE a_pagar > 0.001 
            AND nome_cliente LIKE '%$search%'
            ORDER BY nome_cliente ASC
            LIMIT $offset, 25";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 


  }

  function getClientesDevedoresCampanha($param)
  {
    $search = $param['search'];
    $search_campanha = $param['search_campanha'];
    $offset = $param['offset'];

    $sql = "SELECT 
            cl.id_cliente, cl.nome_cliente, 
            cl.telefone, cl.a_pagar 
            FROM clientes cl, campanhas_clientes cc 
            WHERE cl.a_pagar > 0 
            AND cl.nome_cliente LIKE '%$search%'
            AND cl.id_cliente = cc.id_cliente
            AND cc.id_campanha = (SELECT id_campanha FROM campanhas WHERE nome_campanha = '$search_campanha')
            ORDER BY cl.nome_cliente ASC
            LIMIT $offset, 25";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 


  }

  function getClientesQuitados($param)
  {
    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT 
            id_cliente, nome_cliente, 
            telefone, a_pagar
            FROM clientes 
            WHERE a_pagar < 1 
            AND nome_cliente LIKE '%$search%'
            ORDER BY nome_cliente ASC
            LIMIT $offset, 20";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getClientesQuitadosCampanha($param)
  {
    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT 
            id_cliente, nome_cliente, 
            telefone, a_pagar
            FROM clientes 
            WHERE a_pagar < 1 
            AND nome_cliente LIKE '%$search%'
            ORDER BY nome_cliente ASC
            LIMIT $offset, 20";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getCampanhasCliente($param)
  {
    $id_cliente = $param['id_cliente'];
    $offset = $param['offset'];

    $sql = "SELECT 
            ca.id_campanha, ca.nome_campanha, cc.observacao,
            cc.id_campanha_cliente, cc.valor_campanha
            FROM clientes cl, campanhas ca, campanhas_clientes cc  
            WHERE cl.id_cliente = cc.id_cliente 
            AND ca.id_campanha = cc.id_campanha 
            AND cl.id_cliente = $id_cliente
            ORDER BY ca.nome_campanha DESC
            LIMIT $offset, 20";
 
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getPagamentosCliente($param)
  {
    $id_cliente = $param['id_cliente'];
    $id_campanha_cliente = $param['id_campanha_cliente'];
    $offset = $param['offset'];

    $sql = "SELECT 
            p.id_pagamento, p.valor_pagamento,
            p.forma_pagamento, p.data_pagamento,
            p.instituicao_financeira, p.observacao
            FROM clientes cl, pagamentos p  
            WHERE cl.id_cliente = p.id_cliente 
            AND cl.id_cliente = $id_cliente
            AND p.id_campanha_cliente = $id_campanha_cliente
            LIMIT $offset, 20";
    
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function getCampanhas($param)
  {

    $search = $param['search'];
    $offset = $param['offset'];

    $sql = "SELECT
           * 
           FROM campanhas
           WHERE nome_campanha LIKE '%$search%'
           ORDER BY id_campanha DESC
           LIMIT $offset, 20";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function somarPagamentos($param)
  {
    $id_cliente = $param['id_cliente'];

    $sql = "SELECT 
            SUM(p.valor_pagamento) AS total_pagamentos
            FROM clientes cl, pagamentos p  
            WHERE cl.id_cliente = p.id_cliente 
            AND cl.id_cliente = $id_cliente";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function somarAReceber()
  {

    $sql = "SELECT 
            SUM(a_pagar) AS total_receber
            FROM clientes  
            WHERE a_pagar > 0.00001";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function somarAReceberCampanha($param)
  {
    $search_campanha = $param['search_campanha'];

    $sql = "SELECT 
            SUM(cl.a_pagar) AS total_receber
            FROM clientes cl, campanhas_clientes cc 
            WHERE a_pagar > 0.00001
            AND cl.id_cliente = cc.id_cliente
            AND cc.id_campanha = (SELECT id_campanha FROM campanhas WHERE nome_campanha = '$search_campanha')";
  
    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }


  function somarCampanhas($param)
  {
    $id_cliente = $param['id_cliente'];

    $sql = "SELECT 
            SUM(cc.valor_campanha) AS total_campanhas
            FROM clientes cl, campanhas_clientes cc  
            WHERE cl.id_cliente = cc.id_cliente 
            AND cl.id_cliente = $id_cliente";

    $query = $this->db->prepare($sql);
    $query->execute(); 
    return $query->fetchAll(PDO::FETCH_OBJ); 

  }

  function adicionarCampanha($param)
  {

    $id_cliente = $param['id_cliente'];
    $id_campanha = $param['id_campanha'];
    $valor_campanha = $param['valor_campanha'];
    $observacao = $param['observacao'];

    $sql = "INSERT INTO campanhas_clientes (id_cliente, id_campanha, valor_campanha, observacao)
            VALUES ($id_cliente, $id_campanha, $valor_campanha, '$observacao')";

    $query = $this->db->prepare($sql);
    
    if($query->execute()){

      return true;

    } else{

      return false;

    }

  }

  function adicionarPagamento($param)
  {

    $id_cliente = $param['id_cliente'];
    $id_campanha_cliente = $param['id_campanha_cliente'];
    $valor_pagamento = $param['valor_pagamento'];
    $forma_pagamento = $param['forma_pagamento'];
    $data_pagamento = $param['data_pagamento'];
    $instituicao_financeira = $param['instituicao_financeira'];
    $observacao = $param['observacao'];

    $sql = "INSERT INTO pagamentos (id_cliente, id_campanha_cliente, valor_pagamento, forma_pagamento, data_pagamento, instituicao_financeira, observacao)
            VALUES ($id_cliente,$id_campanha_cliente , $valor_pagamento, '$forma_pagamento', '$data_pagamento', '$instituicao_financeira', '$observacao')";

    $query = $this->db->prepare($sql);

    if($query->execute()){

      return true;

    } else{

      return false;

    }

  }

  function alterarConta($param)
  {

    $id_cliente = $param['id_cliente'];
    $a_pagar = $param['a_pagar'];

    $sql = "UPDATE clientes
            SET a_pagar = $a_pagar
            WHERE id_cliente = $id_cliente";


    $query = $this->db->prepare($sql);

    if($query->execute()){

      return true;
    } 

    return false;
  }

  function deletarCampanhaCliente($param)
  {

    $id_campanha_cliente = $param['id_campanha_cliente'];

    $sql = "DELETE FROM campanhas_clientes
            WHERE id_campanha_cliente = $id_campanha_cliente";

    $query = $this->db->prepare($sql);
    
    if($query->execute()){

      return true;
    } 

    return false;
  }

  function deletarPagamentoCliente($param)
  {

    $id_pagamento = $param['id_pagamento'];

    $sql = "DELETE FROM pagamentos
            WHERE id_pagamento = $id_pagamento";

    $query = $this->db->prepare($sql);
    
    if($query->execute()){

      return true;
    } 

    return false;
  }
}