<?php

class ConexaoDB{
    
    public static function getConectar(){
    
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbname = "giraclubedb";

        /*$host = "localhost";
        $user = "u251266015_giraclub";
        $pass = "LRUeXLy+2Qn";
        $dbname = "u251266015_giraclub";*/
    
        try{
    
            $conn = new PDO("mysql:host=$host;dbname=". $dbname, $user, $pass);
            return $conn;
           // echo "Conexão com banco foi realizada";
        }catch(PDOException $error){
            echo "Erro: Conexão com o banco de dados. {$error->getMessage()}";
        
        }
    }
}