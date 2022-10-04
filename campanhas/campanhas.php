<?php @include_once '../navbar.php' ?>

<title>Campanhas</title>

<div class="content">
    <div class="content-items">
        <input type="text" class="input-model" placeholder="Buscar Campanhas" id="buscar-campanhas">
        <div id="xgCampanhas"></div>

        <button class="btn-model btn-novo"><i class="fa-solid fa-circle-plus"></i> NOVO</button>
        <button class="btn-model btn-deletar"><i class="fa-solid fa-circle-xmark"></i> EXCLUIR</button>
    </div>
</div>

<div id="xmModalNovaCampanha">
    <div class="content-modal">
        <label class="label-modal">Campanha</label>
        <input type="text" class="input-model" id="nova-campanha-input">
    </div>
</div>

<div id="xmModalEditarCampanha">
    <div class="content-modal">
        <label class="label-modal">Campanha</label>
        <input type="text" class="input-model" id="editar-campanha-input">
    </div>
</div>

<script src="../js/index.js" type="text/javascript"></script>
<script src="./campanhas.js" type="text/javascript"></script>