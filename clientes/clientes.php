<?php @include_once '../navbar.php' ?>

<!DOCTYPE html lang="pt-br">
<html>

<head>

<title>CLIENTES</title>
</head>
<body>
<div class="content">
    <div class="content-items">
        <input type="text" class="input-model" placeholder="Buscar Clientes" id="buscar-clientes">
        <div id="xgClientes"></div>

        <button class="btn-model btn-novo"><i class="fa-solid fa-circle-plus"></i> NOVO</button>
        <button class="btn-model btn-deletar"><i class="fa-solid fa-circle-xmark"></i> EXCLUIR</button>
    </div>
</div>

<div id="xmModalNovoCliente">
    <div class="content-modal">
        <label class="label-modal">CLIENTE</label>
        <input type="text" class="input-model" id="novo-cliente-input">
        <label class="label-modal">TELEFONE</label>
        <input type="text" class="input-model TELEFONE" id="novo-telefone-input">
    </div>
</div>
<div id="xmModalEditarCliente">
    <div class="content-modal">
        <label class="label-modal">CLIENTE</label>
        <input type="text" class="input-model" id="editar-cliente-input">
        <label class="label-modal">TELEFONE</label>
        <input type="text" class="input-model TELEFONE" id="editar-telefone-input">
    </div>
</div>

<script src="../js/index.js" type="text/javascript"></script>
<script src="./clientes.js" type="text/javascript"></script>
</body>
</html>