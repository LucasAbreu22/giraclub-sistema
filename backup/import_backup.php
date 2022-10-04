<?php
$tipo_arquivo = $_FILES['arquivo-banco']['type'];

$pagina = $_POST['pagina'];

if($tipo_arquivo !== 'application/octet-stream'){
    die();
}

include_once '../conection/connection.php';

$uploaddir = './';
$uploadfile = $uploaddir . basename($_FILES['arquivo-banco']['name']);

move_uploaded_file($_FILES['arquivo-banco']['tmp_name'], $uploadfile);

$db = ConexaoDB::getConectar();
$query = file_get_contents($uploadfile);
$stmt = $db->prepare($query);
if($stmt->execute()){
    echo "Successfully imported.";

    $file = $uploadfile;
    
    if (!unlink($file)) { 
        echo ("$file não pode ser deletado"); 
    } 
    else { 
        echo ("$file foi excluído com sucesso"); 
    } 
    header("Location: ../$pagina/$pagina.php");
}else{
    echo "Fail import.";
}
?>