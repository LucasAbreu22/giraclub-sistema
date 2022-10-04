let xgClientesRelacionados
let xgClientes

let xgCampanhasCliente;
let xgCampanhas;

let xgPagamentosCliente;

let xmPagamento

let xmCampanha;
let xmValorCampanha;

let xmObservacaoCampanhaCliente
let xmObservacaoPagamentoCliente

const url = './per.home.php'

$(function () {
    clientes.grid()
    clientes.criarModal()

    $("#pagina").val('home')

    $( ".actual-page-bg" ).removeClass( "actual-page-bg" );
    $( ".actual-page-icon" ).removeClass( "actual-page-icon" );
    
    $( "#page-home" ).addClass( "actual-page-bg" );
    $( "#page-home-icon" ).addClass( "actual-page-icon" );


    $("#btn-nova-campanha").click(()=>{
        clientes.nova_campanha()
    })
    
    $("#btn-deletar-campanha").click(()=>{
        clientes.deletarCampanhaCliente()
    })

    $("#btn-novo-pagamento").click(()=>{
        xmPagamento.open()
    })

    $("#btn-deletar-pagamento").click(()=>{
        clientes.deletarPagamentoCliente()
    })

    $("#filter-devedores").click(()=>{
        let search = $('.buscar-clientes-home').val().toUpperCase().trim()
        xgClientes.queryOpen({search: search})
    })
    
    $("#filter-quitados").click(()=>{
        let search = $('.buscar-clientes-home').val().toUpperCase().trim()
        xgClientes.queryOpen({search: search})
    })

    $(".buscar-clientes-home").keydown((e)=>{
        let key = e.which

        if(key === 13) {
            let search = $(".buscar-clientes-home").val().toUpperCase().trim()

            xgClientes.queryOpen({ search: search })
        }
    })

    $(".buscar-campanhas-home").keydown((e)=>{
        let key = e.which

        if(key === 13) {
            let search = $(".buscar-clientes-home").val().toUpperCase().trim()

            xgClientes.queryOpen({ search: search })
        }
    })

    $("#buscar-campanha").keydown((e)=>{
        let key = e.which

        if(key === 13) {
            let search = $("#buscar-campanha").val().toUpperCase().trim()

            xgCampanhas.queryOpen({ search: search })
        }
    })

    $("#valor-campanha").keydown((e)=>{
        let key = e.which

        if(key === 13) $("#edt-observacao-campanha-cliente").focus()
        
    })

    $("#edt-observacao-campanha-cliente").keydown((e)=>{
        let key = e.which

        if(key === 13)  clientes.adicionarCampanha()
        
    })

    $('.back-page').click(()=>{
        $('#tela-1').show();
        $('#tela-2').hide();

        xgClientes.enable()

        xgClientes.queryOpen({search: ''})
    })

    xgClientes.queryOpen({search: ''})
});


var clientes = (function () {

    let cliente = {
        id_cliente : '',
        nome_cliente : '',
        telefone : '',
        a_pagar : '',
    }
    let campanhaCliente = {
        id_campanha_cliente: ''
    }
    let campanha = {
        id_campanha: '',
        valor_campanha: '',
        observacao: '',
    }
    let pagamentosCliente ={
        id_pagamento: '',
        forma_pagamento: '',
        data_pagamento: '',
        valor_pagamento: '',
        instituicao_financeira: '',
    }

    let devedores = ''
    let quitados = ''

    const url = './per.home.php'

    function grid() {
        xgClientes = new xGridV2.create({
            el: "#xgClientes",
            height: "75%",
            heightLine: 27,
            width: "100%",
            theme: "x-clownV2",
            columns: {
                "Cliente":{
                    dataField: "nome_cliente",
                },
                "Valor":{
                    dataField: "a_pagar",
                    render: addReal,
                    width: "20%",
                },
            },

            onKeyDown: {
                13: (ln) => {

                    cliente = ln
                    cliente.a_pagar = Number(ln.a_pagar)
                    setClienteTela()
                },
            },

            onSelectLine: (ln) =>{
                cliente = ln
                cliente.a_pagar = Number(ln.a_pagar)
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                cliente = ln
                cliente.a_pagar = Number(ln.a_pagar)
                setClienteTela()

            },

            query: {
                execute: (r) => {
                    getClientesDevedoresEQuitados(r.param.search, r.offset)
                },
            }
        })
        
        xgCampanhasCliente = new xGridV2.create({
            el: "#xgCampanhasCliente",
            height: "25%",
            heightLine: 27,
            width: "100%",
            theme: "x-clownV2",
            columns: {
                "Campanha":{
                    dataField: "nome_campanha",
                },
                "Valor":{
                    dataField: "valor_campanha",
                    render: addRealCampanhaPagamento,
                    width: "20%",
                },
            },
            onKeyDown: {
                46: (ln) => {
                    campanhaCliente = ln

                    deletarCampanhaCliente()

                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                campanhaCliente = ln

                $("#observacao-campanha-cliente").val(campanhaCliente.observacao)

                xmObservacaoCampanhaCliente.open()

            },

            onSelectLine: (ln) =>{
                campanhaCliente = ln
                xgPagamentosCliente.queryOpen({search: ''})
            },

            query: {
                execute: (r) => {
                    getCampanhasCliente(r.offset)
                },
            }
        })

        xgCampanhas = new xGridV2.create({
            el: "#xgCampanhas",
            height: 260,
            heightLine: 27,
            width: 400,
            theme: 'x-clownV2',
            columns: {
                "Campanha":{
                    dataField: "nome_campanha",
                },
            },
            onKeyDown: {
                13: (ln) => {

                    campanha = ln
                    campanha.valor_campanha = Number(ln.valor_campanha)
                    xmValorCampanha.open()

                    $("#valor-campanha").focus()
                },
            },

            onSelectLine: (ln) =>{
                campanha = ln
                campanha.valor_campanha = Number(ln.valor_campanha)
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                campanha = ln
                campanha.valor_campanha = Number(ln.valor_campanha)
                xmValorCampanha.open()

                $("#valor-campanha").focus()
            },
            query: {
                execute: (r) => {
                    getCampanhas(r.param.search, r.offset)
                },
            }
        })

        xgPagamentosCliente = new xGridV2.create({
            el: "#xgPagamentosCliente",
            height: "25%",
            heightLine: 27,
            width: "100%",
            theme: "x-clownV2",
            columns: {
                "Forma de Pagamento":{
                    dataField: "forma_pagamento",
                },
                "Instituição Financeira":{
                    dataField: "instituicao_financeira",
                },
                "Data do Pagamento":{
                    dataField: "data_pagamento",
                    render: util.dataBrasil,
                    center: true,
                },
                "Valor":{
                    dataField: "valor_pagamento",
                    render: addRealCampanhaPagamento,
                },
            },
            onKeyDown: {
                46: (ln) => {
                    pagamentosCliente = ln
                    pagamentosCliente.valor_pagamento = Number(ln.valor_pagamento)

                    deletarPagamentoCliente()

                },
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                pagamentosCliente = ln

                $("#observacao-pagamento-cliente").val(pagamentosCliente.observacao)

                xmObservacaoPagamentoCliente.open()

            },

            onSelectLine: (ln) =>{
                pagamentosCliente = ln
                pagamentosCliente.valor_pagamento = Number(ln.valor_pagamento)
            },

            query: {
                execute: (r) => {
                    getPagamentosCliente(r.offset)
                },
            }
        })
    }

    function getClientesDevedoresEQuitados(search, offset) {

        let search_campanha = $(".buscar-campanhas-home").val().toUpperCase().trim()

        var dados = ''

        if(search_campanha !== ""){
        
        axios.post(url, {
            call: 'getDevedoresCampanha',
            param: {
                search: search,
                search_campanha: search_campanha,
                offset: offset,
            }
        })
        .then(r => {

            let a_receber =  r.data.pop()
            a_receber = Number(a_receber.total_receber)

            $('#total-receber').text(a_receber.toFixed(2))
            xgClientes.querySourceAdd(r.data);

            if (r.data[0]) xgClientes.focus();

        })
        }else{
            validarFiltros()

            axios.post(url, {
                call: 'getDevedoresEQuitados',
                param: {
                    search: search,
                    search_campanha: search_campanha,
                    offset: offset,
                    quitados: quitados,
                    devedores: devedores,
                }
            })
            .then(r => {

                dados = r.data

                let a_receber =  r.data.pop()
                a_receber = Number(a_receber.total_receber)

                $('#total-receber').text(a_receber.toFixed(2))
                xgClientes.querySourceAdd(r.data);

                if (r.data[0]) xgClientes.focus();
                
            })
        }
       
        
    }

    function getCampanhasCliente(offset){

        resetCampanhaCliente()
        axios.post(url, {
            call: 'getCampanhasCliente',
            param: {
                offset: offset,
                id_cliente: cliente.id_cliente,
            }
        })
            .then(r => {

                if (r.data[0]){
                    let total_campanhas = r.data.pop()
                    total_campanhas = total_campanhas.total_campanhas

                    if(total_campanhas === null || total_campanhas === "") total_campanhas = 0

                    xgCampanhasCliente.querySourceAdd(r.data);
                    xgCampanhasCliente.focus()

                    $("#total-campanha").text(Number(total_campanhas).toFixed(2))
                }
                else{
                    xgCampanhasCliente.querySourceAdd(r.data);
                }
            })
    }

    function getPagamentosCliente(offset){

        resetPagamentosCliente()
        axios.post(url, {
            call: 'getPagamentosCliente',
            param: {
                offset: offset,
                id_cliente: cliente.id_cliente,
                id_campanha_cliente: campanhaCliente.id_campanha_cliente,
            }
        })
            .then(r => {

                if (r.data[0]){
                    let total_pagamentos = r.data.pop()
                    total_pagamentos = total_pagamentos.total_pagamentos

                    if(total_pagamentos === null || total_pagamentos === "") total_pagamentos = 0

                    xgPagamentosCliente.querySourceAdd(r.data);
                    xgPagamentosCliente.focus()

                    $("#total-pagamento").text(Number(total_pagamentos).toFixed(2))
                }
                else{
                    xgPagamentosCliente.querySourceAdd(r.data);
                }
            })
    }

    function getCampanhas(search, offset){
        resetCampanha()
        axios.post(url, {
            call: 'getCampanhas',
            param: {
                search: search,
                offset: offset,
            }
        })
            .then(r => {
                xgCampanhas.querySourceAdd(r.data);
                if (r.data[0]){
                    xgCampanhas.focus();
                }
            })
    }

    function nova_campanha(){
        xmCampanha.open()

        xgCampanhas.queryOpen({search: ''})
    }

    function deletarCampanhaCliente(){
        if(campanhaCliente.id_campanha === "" || campanhaCliente.id_campanha === null){
            show("CAMPANHA NÃO IDENTIFICADO!")
            return false;
        }

        confirmaCodigo({
            msg: "Digite o código abaixo para EXCLUIR a campanha '"+ campanhaCliente.nome_campanha + "'.",
            call: ()=>{
                
        
                let a_pagar = Number(campanhaCliente.valor_campanha)

                a_pagar =  cliente.a_pagar - a_pagar

                axios.post(url, {
                    call: 'deletarCampanhaCliente',
                    param:{
                        id_cliente: cliente.id_cliente,
                        id_campanha_cliente: campanhaCliente.id_campanha_cliente,
                        a_pagar: a_pagar,
                    }
                })
                .then(r => {

                    if (r.data){
                        resetCampanhaCliente()
                        cliente.a_pagar = a_pagar

                        $('#a_pagar').text("R$ "+ cliente.a_pagar.toFixed(2));

                        resetCampanhaCliente()

                        xgCampanhasCliente.queryOpen({search: ''})
                        xgCampanhasCliente.focus();

                        show("CAMPANHA REMOVIDA COM SUCESSO!")
                        
                    }
                    else{
                        show("ERRO AO ATUALIZAR DADOS[2]")
                    }
                })
               
            }
        })

        
    }

    function deletarPagamentoCliente(){

        if(pagamentosCliente.id_pagamento === "" || pagamentosCliente.id_pagamento === null || pagamentosCliente.id_pagamento === undefined){
            show("PAGAMENTO NÃO IDENTIFICADO!")
            return false;
        }

        confirmaCodigo({
            msg: "Digite o código abaixo para EXCLUIR o pagamento.",
            call: ()=>{
        
                let a_pagar = Number(pagamentosCliente.valor_pagamento)

                a_pagar =  cliente.a_pagar + a_pagar

                axios.post(url, {
                    call: 'deletarPagamentoCliente',
                    param:{
                        id_cliente: cliente.id_cliente,
                        id_pagamento: pagamentosCliente.id_pagamento,
                        a_pagar: a_pagar,
                    }
                })
                .then(r => {

                    if (r.data){
                        resetPagamentosCliente()

                        cliente.a_pagar = a_pagar

                        $('#a_pagar').text("R$ "+ cliente.a_pagar.toFixed(2));


                        xgPagamentosCliente.queryOpen({search: ''})
                        xgPagamentosCliente.focus();

                        show("PAGAMENTO REMOVIDO COM SUCESSO!")
                        
                    }
                    else{
                        show("ERRO AO ATUALIZAR DADOS[4]")
                    }
                })


            }
        })

        
    }

    function validarFiltros(){
        if ($("#filter-devedores").is(":checked") == true) {
            devedores = "DEVEDORES";
        }

        if ($("#filter-devedores").is(":checked") == false) {
            devedores = "";
        }

        if ($("#filter-quitados").is(":checked") == true) {
            quitados = "QUITADOS";
        }

        if ($("#filter-quitados").is(":checked") == false) {
            quitados = "";
        }
    }

    function addReal(value){

        if(value == 0.00001) return "NOVO CLIENTE";

        else if(value < 0.01) return "QUITADO";

        else if(value > 0) return "R$ " + Number(value).toFixed(2);

        else if(value < 0) return "COM CRÉDITO";
    }

    function addRealCampanhaPagamento(value){

        return "R$ " + Number(value).toFixed(2);
    }

    function setClienteTela(){

        xgClientes.disable()

        if(cliente.a_pagar == 0) cliente.a_pagar = 0

        cliente.a_pagar = Number(cliente.a_pagar)

        $('#nome_cliente').text(cliente.nome_cliente);
        $('#telefone').text(cliente.telefone);
        $('#a_pagar').text("R$ "+ cliente.a_pagar.toFixed(2));

        $('#tela-1').hide();
        $('#tela-2').show();

        xgCampanhasCliente.queryOpen({search: ''})
        xgPagamentosCliente.queryOpen({search: ''})
    }

    function resetCliente(){

        cliente = {
            id_cliente : '',
            nome_cliente : '',
            telefone : '',
            a_pagar : '',
        }
    }

    function resetCampanhaCliente(){

        campanhaCliente = {
            id_campanha_cliente: ''
        }

    }

    function resetCampanha(){

        campanha = {
            id_campanha: '',
            valor_campanha: '',
            observacao: '',
        }

    }

    function resetPagamentosCliente(){

        pagamentosCliente = {
            id_pagamento: '',
            forma_pagamento: '',
            data_pagamento: '',
            valor_pagamento: '',
            instituicao_financeira: '',
        }

    }

    function adicionarCampanha(){

        campanha.valor_campanha = Number($("#valor-campanha").val())
        campanha.observacao = $("#edt-observacao-campanha-cliente").val()
        
        if(isNaN(campanha.valor_campanha) === true || campanha.valor_campanha === "" || campanha.valor_campanha <= 0){
            show("VALOR INVÁLIDO PARA A CAMPANHA!")
        }else{

            let a_pagar = cliente.a_pagar + campanha.valor_campanha

            axios.post(url, {
                call: 'adicionarCampanha',
                param: {
                    id_cliente: cliente.id_cliente,
                    id_campanha: campanha.id_campanha,
                    valor_campanha: campanha.valor_campanha,
                    observacao: campanha.observacao,
                    a_pagar: a_pagar
                }
            })
                .then(r => {
                
                    if (r.data){

                        cliente.a_pagar += campanha.valor_campanha

                        $('#a_pagar').text("R$ "+ cliente.a_pagar.toFixed(2));

                        xgCampanhasCliente.queryOpen({search: ''})
                        xgCampanhasCliente.focus();

                        show("CAMPANHA ADICIONADA COM SUCESSO!")

                        xmCampanha.close()
                        xmValorCampanha.close()
                        
                    }
                    else{
                        show("ERRO AO ATUALIZAR DADOS[1]")
                    }
            })
        }
    }

    function adicionarPagamento(){

        pagamentosCliente.valor_pagamento = Number($("#valor-pagamento").val())
        pagamentosCliente.forma_pagamento = $("#forma-pagamento").val().toUpperCase()
        pagamentosCliente.data_pagamento = $("#data-pagamento").val()
        pagamentosCliente.instituicao_financeira = $("#instituicao-financeira").val().toUpperCase()
        pagamentosCliente.observacao = $("#observacao-pagamento").val().toUpperCase()

        if(isNaN(pagamentosCliente.valor_pagamento) === true || pagamentosCliente.valor_pagamento === "" || pagamentosCliente.valor_pagamento <= 0 || 
            pagamentosCliente.valor_pagamento === null){
            setTimeout(() => {
                show("VALOR INVÁLIDO PARA O PAGAMENTO!")
            }, 1);
            return false
        }

        if(pagamentosCliente.forma_pagamento === "" || pagamentosCliente.forma_pagamento === null){
            setTimeout(() => {
                show("FORMA DE PAGAMENTO INVÁLIDO!")
            }, 1);
            return false
        }

        if(pagamentosCliente.data_pagamento === true || pagamentosCliente.data_pagamento === ""){
            setTimeout(() => {
                show("DATA DE PAGAMENTO INVÁLIDA!")
            }, 1);
            return false
        }


        if(pagamentosCliente.instituicao_financeira === null || pagamentosCliente.instituicao_financeira === ''){
            setTimeout(() => {
                show("INSTITUIÇÃO FINANCEIRA INVÁLIDA!")
            }, 1);
            return false
        }

        if(campanhaCliente.id_campanha_cliente === "" || campanhaCliente.id_campanha_cliente === null || campanhaCliente.id_campanha_cliente === undefined){
            setTimeout(() => {
                show("CAMPANHA DO CLIENTE NÃO SELECIONADA!")
            }, 1);
            return false
        }
        
        
        
        else{
            let a_pagar = cliente.a_pagar - pagamentosCliente.valor_pagamento

            a_pagar = Number(a_pagar.toFixed(2))

            axios.post(url, {
                call: 'adicionarPagamento',
                param: {
                    id_cliente: cliente.id_cliente,
                    id_campanha_cliente: campanhaCliente.id_campanha_cliente,
                    valor_pagamento: pagamentosCliente.valor_pagamento,
                    forma_pagamento: pagamentosCliente.forma_pagamento,
                    data_pagamento: pagamentosCliente.data_pagamento,
                    instituicao_financeira: pagamentosCliente.instituicao_financeira,
                    observacao: pagamentosCliente.observacao,
                    a_pagar: a_pagar
                }
            })
                .then(r => {
                
                    if (r.data){

                        cliente.a_pagar -= pagamentosCliente.valor_pagamento

                        $('#a_pagar').text("R$ "+ cliente.a_pagar.toFixed(2));

                        xgPagamentosCliente.queryOpen({search: ''})
                        xgPagamentosCliente.focus();

                        show("PAGAMENTO ADICIONADO COM SUCESSO!")

                        xmPagamento.close()
                        
                    }
                    else{
                        show("ERRO AO ATUALIZAR DADOS[3]")
                    }
            })
        }
    }

    /*MODAL*/

    function criarModal(){
        xmCampanha = new xModal.create({
            el: "#xmCampanha",
            title: "Campanha",
            width: 480,
            height: 440,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {

                    xmValorCampanha.open()
                    $("#valor-campanha").focus()
                    
                  },
                },
            },
            onClose: ()=>{
                $("#buscar-campanha").val('')
                resetCampanha()
            }
        })

        xmValorCampanha = new xModal.create({
            el: "#xmValorCampanha",
            title: "Valor da Campanha",
            width: 275,
            height: 420,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    adicionarCampanha()
                  },
                },
            },
            onClose: ()=>{
                $("#valor-campanha").val('')
                $("#edt-observacao-campanha-cliente").val('')
            }
        })

        xmPagamento = new xModal.create({
            el: "#xmPagamento",
            title: "Valor da Campanha",
            width: 280,
            height: 490,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    adicionarPagamento()
                  },
                },
            },
            onClose: ()=>{
                $("#valor-pagamento").val('')
                $("#data-pagamento").val('')
                $("#instituicao-financeira").val('')
                $("#forma-pagamento").val('')
                $("#observacao-pagamento").val('')
            }
        })

        xmObservacaoCampanhaCliente = new xModal.create({
            el: "#xmObservacao",
            title: "Observação da Campanha",
            width: 280,
            height: 290,

            onClose: ()=>{
                $("#observacao-campanha-cliente").val('')
            }
        })
        xmObservacaoPagamentoCliente = new xModal.create({
            el: "#xmObservacaoPagamento",
            title: "Observação do Pagamento",
            width: 280,
            height: 290,

            onClose: ()=>{
                $("#observacao-pagamento-cliente").val('')
            }
        })
    }

    return {
        grid: grid,
        nova_campanha: nova_campanha,
        criarModal: criarModal,
        adicionarCampanha: adicionarCampanha,
        deletarCampanhaCliente: deletarCampanhaCliente,
        deletarPagamentoCliente: deletarPagamentoCliente,
    }
})();
