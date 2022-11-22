<?php

class ConexaoDB{
    
    public static function getConectar(){
    
        $host = "localhost";
        $user = "root";
        $pass = "";
        $dbname = "giraclubedb";
        
        try{
    
            $conn = new PDO("mysql:host=$host;dbname=". $dbname, $user, $pass);
            return $conn;
           // echo "Conexão com banco foi realizada";
        }catch(PDOException $error){
            echo "Erro: Conexão com o banco de dados. {$error->getMessage()}";
        
        }
    }
}
