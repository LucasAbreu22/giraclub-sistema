<?php @include_once '../navbar.php' ?>

<title>HOME</title>

<div class="content" id="tela-1">
    <div class="content-items">
        <div class="content-filters">
            <div class="content-filters-clientes">
                <input type="checkbox" class="filter-checkbox-clients" name="filter-devedores" id="filter-devedores" checked> <label class="label-filters" for="filter-devedores">DEVEDORES</label>
                <input type="checkbox" class="filter-checkbox-clients filter-checkbox-clients2" name="filter-quitados" id="filter-quitados"> <label class="label-filters" for="filter-quitados">QUITADOS</label>
            </div>
            <div class="content-buscar-clientes-home">
                <input type="text" class="inputs-text buscar-clientes-home" placeholder="Buscar Clientes">
                <input type="text" class="inputs-text buscar-campanhas-home" placeholder="Buscar Campanhas">
            </div>
        </div>
    
        <div id="xgClientes"></div>
        <div id="total-receber-bg">
            <label class="total-receber">A Receber: R$ <label id="total-receber"></label></label>
        </div>
    </div>
</div>

<div class="content" id="tela-2" hidden>
    <div class="back-page">
        <i class="fa-solid fa-angle-left"></i>
    </div>
    <div id="info-cliente">
        <div id="nome-cliente-space">
            <label class="label-topic">Cliente</label><br>
            <label id="nome_cliente"></label>
        </div>
        <div id="telefone-space">
            <label class="label-topic">Telefone</label><br>
            <label id="telefone"></label>
        </div>
        <div id="a-pagar-space">
            <label class="label-topic">A pagar</label><br>
            <label id="a_pagar"></label>
        </div>
    </div>
    <hr>
    <div class="content-list">
        <div id="xgCampanhasCliente" class="list"></div>
        <div id="pnButtonsCampanhas" class="buttons-list">
            <div class="buttons">
                <button class="btn-model btn-novo" id="btn-nova-campanha"><i class="fa-solid fa-circle-plus"></i> NOVO</button>
                <button class="btn-model btn-deletar" id="btn-deletar-campanha"><i class="fa-solid fa-circle-xmark"></i> EXCLUIR</button>
            </div>
            <div class="total-campanha">Total: R$ <label id="total-campanha"></label></div>
        </div>

        <div id="xgPagamentosCliente" class="list"></div>
        <div id="pnButtonsPagamentos" class="buttons-list">
            <div class="buttons">
                <button class="btn-model btn-novo" id="btn-novo-pagamento"><i class="fa-solid fa-circle-plus"></i> NOVO</button>
                <button class="btn-model btn-deletar" id="btn-deletar-pagamento"><i class="fa-solid fa-circle-xmark"></i> EXCLUIR</button>
            </div>
            <div class="total-pagamento">Total: R$ <label id="total-pagamento"></label></div>
        </div>
    </div>
</div>

<div id="xmCampanha" class="modal-list">
    <input type="text" class="input-model" id="buscar-campanha" placeholder="Buscar Campanha">
    <div id="xgCampanhas"></div>
</div>

<div id="xmValorCampanha" >
    <div class="content-modal">
        <label class="label-modal">Valor da Campanha</label>
        <input type="number" class="input-model" id="valor-campanha">
        <label class="label-modal">Observação</label>
        <textarea class="input-model" id="edt-observacao-campanha-cliente" placeholder="OBSERVAÇÃO"></textarea>

    </div>
</div>

<div id="xmPagamento">
    <div class="content-modal">
        <label class="label-modal">Valor do Pagamento</label>
        <input type="number" class="input-model" id="valor-pagamento">
        <label class="label-modal">Forma de Pagamento</label>
        <input type="text" class="input-model" id="forma-pagamento">
        <label class="label-modal">Instituição Financeira</label>
        <input type="text" class="input-model" id="instituicao-financeira">
        <label class="label-modal">Data do Pagamento</label>
        <input type="date" class="input-model" id="data-pagamento">
        <label class="label-modal">Observação</label>
        <textarea class="input-model" id="observacao-pagamento" placeholder="OBSERVAÇÃO"></textarea>
    </div>
</div>

<div id="xmObservacao">
    <div class="content-modal">
        <label>Observação</label><br>
        <textarea class="input-model" id="observacao-campanha-cliente" disabled></textarea>
    </div>
</div>

<div id="xmObservacaoPagamento">
    <div class="content-modal">
        <label>Observação</label><br>
        <textarea class="input-model" id="observacao-pagamento-cliente" disabled></textarea>
    </div>
</div>


<script src="./home.js"></script>