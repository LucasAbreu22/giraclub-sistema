<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_cache_limiter(1);
session_cache_expire(1);
ob_start(); /* Evitando warning */
session_start();
include_once './sql.login.php';

extract(json_decode(file_get_contents("php://input"), TRUE));


class Login
{

    private $sql;

    function __construct()
    {

        //instancia da class        
        $this->sql = new SqlLogin();
    }

    function getLogin($param)
    {
        $call = $this->sql->getLogin($param);

        if(empty($call)){
            echo '{"msg":"Senha ou login inválido"}';
            return false;
        }

        $_SESSION['giraclube'] = $call;

        echo json_encode($call);
    }

    function session()
    {
        
        if (@$_SESSION['giraclube'])
            echo json_encode($_SESSION['giraclube']);

        else{
            echo 'sem_login';
            return false;
        }

    }

    function sair()
    {
        if(session_destroy()){
            echo '{"msg":"login finalizado"}';
        }
    }

}

$class = new Login();
$class->$call(@$param);