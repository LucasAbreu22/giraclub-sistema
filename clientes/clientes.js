let xgClientes
let xmNovoCliente
let xmEditarCliente

$(function () {
    clientes.grid()
    clientes.criarModal()

    $("#pagina").val('clientes')

    $( ".actual-page-bg" ).removeClass( "actual-page-bg" );
    $( ".actual-page-icon" ).removeClass( "actual-page-icon" );
    
    $( "#page-clientes" ).addClass( "actual-page-bg" );
    $( "#page-clientes-icon" ).addClass( "actual-page-icon" );

    $('.btn-novo').click(()=>{
        xmNovoCliente.open()
        $('#novo-cliente-input').focus()
    })

    $('.btn-deletar').click(()=>{
        clientes.deletarCliente()
    })

    $('#novo-cliente-input').keydown((e)=>{
        let key = e.which

        if(key === 13) $('#novo-telefone-input').focus()

    })

    $('#novo-telefone-input').keydown((e)=>{
        let key = e.which

        if(key === 13) {
            clientes.salvarNovoCliente()
            xmNovoCliente.close()
        }
    })

    $('#editar-cliente-input').keydown((e)=>{
        let key = e.which

        if(key === 13) $('#editar-telefone-input').focus()

    })

    $('#editar-telefone-input').keydown((e)=>{
        let key = e.which

        if(key === 13) {
            clientes.salvarEdicaoCliente()
            xmEditarCliente.close()
        }
    })

    $("#buscar-clientes").keydown((e)=>{
        let key = e.which

        if(key === 13) {
            let search = $("#buscar-clientes").val().toUpperCase().trim()

            xgClientes.queryOpen({ search: search })
        }

        
    })

    xgClientes.queryOpen({ search: '' })
});


var clientes = (function () {

    let cliente = {
        id_cliente : '',
        nome_cliente : '',
        telefone : '',
    }

    const url = './per.clientes.php'

    function grid(){
        xgClientes = new xGridV2.create({
            el: "#xgClientes",
            height: "70%",
            heightLine: 27,
            width: "90%",
            theme: "x-clownV2",
            columns: {
                "Cliente":{
                    dataField: "nome_cliente",
                },
                "Telefone":{
                    dataField: "telefone",
                    width: "35%",
                },
            },

            onKeyDown: {
                46: (ln) => {
                    cliente = ln

                    deletarCliente();
                },
                13: (ln) => {

                    cliente.id_cliente = ln.id_cliente
                    cliente.nome_cliente = ln.nome_cliente
                    cliente.telefone = ln.telefone

                    $('#editar-cliente-input').val(cliente.nome_cliente)
                    $('#editar-telefone-input').val(cliente.telefone)

                    xmEditarCliente.open()

                    $('#editar-cliente-input').focus()
                },
            },

            onSelectLine: (ln) =>{
                cliente = ln
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                cliente = ln

                $('#editar-cliente-input').val(cliente.nome_cliente)
                $('#editar-telefone-input').val(cliente.telefone)

                xmEditarCliente.open()
                $('#editar-cliente-input').focus()
            },

            query: {
                execute: (r) => {
                    getClientes(r.param.search, r.offset)
                },
            }
        })
    }

    function getClientes(search, offset) {
        axios.post(url, {
            call: 'getClientes',
            param: {search: search, offset: offset}
        })
        .then(r => {

            xgClientes.querySourceAdd(r.data);

            if (r.data[0])
                xgClientes.focus();
        })
    }

    function salvarNovoCliente(){

        cliente.id_cliente = ''
        cliente.nome_cliente = $('#novo-cliente-input').val().toUpperCase()
        cliente.telefone = $('#novo-telefone-input').val().toUpperCase()

        inserirCliente()
    }

    function salvarEdicaoCliente(){

        cliente.nome_cliente = $('#editar-cliente-input').val().toUpperCase()
        cliente.telefone = $('#editar-telefone-input').val().toUpperCase()
        inserirCliente()
    }

    function deletarCliente(){

        confirmaCodigo({
            msg: "Digite o código abaixo para EXCLUIR o cliente '"+ cliente.nome_cliente + "'.",
            call: ()=>{
                if(cliente.id_cliente === "" || cliente.id_cliente === null){
                    show("CLIENTE NÃO IDENTIFICADO!")
                    return false;
                }
        
                axios.post(url, {
                    call: 'deletarCliente',
                    param: cliente.id_cliente
                })
                .then(r => {
        
                    if(r.data === 1) {
        
                        show("EXCLÚIDO COM SUCESSO!")
                        xgClientes.deleteLine()
                    }
        
                    else show("ERRO INTERNO! VERIFIQUE SE O CLIENTE POSSUI CAMPANHAS E PAGAMENTOS ATRELADOS.")
                })
               
            }
        })

        
    }

    function inserirCliente(){

        if(cliente.nome_cliente === null || cliente.nome_cliente === ""){
            setTimeout(() => {
                show("NOME DO CLIENTE INVÁLIDO!")
            }, 1);
            return false
        }

        if(cliente.telefone === null || cliente.telefone === "" || cliente.telefone.length < 13){
            setTimeout(() => {
                show("NÚMERO DO CLIENTE INVÁLIDO!")
            }, 1);
            return false
        }

        axios.post(url, {
            call: 'setClientes',
            param: {id_cliente: cliente.id_cliente, nome_cliente: cliente.nome_cliente, telefone: cliente.telefone}
        })
        .then(r => {

            if (r.data >= 1){


                xgClientes.queryOpen({search: ''})

                cliente = {
                    id_cliente : '',
                    nome : '',
                    telefone : '',
                }

                show("CLIENTE CADASTRADO COM SUCESSO!")
            }

            else if(r.data === 'EDITADO'){

                xgClientes.dataSource('nome_cliente', cliente.nome_cliente)
                xgClientes.dataSource('telefone', cliente.telefone)

                show("CLIENTE EDITADO COM SUCESSO!")
            }

            if (r.data === "CADASTRADO"){
                show("CLIENTE JÁ CADASTRADO!")
            }

            if (r.data === "ERRO"){
                show("ERRO INTERNO!")
            }
        })
    }

    function criarModal(){
        xmNovoCliente = new xModal.create({
            el: "#xmModalNovoCliente",
            title: "Novo Cliente",
            width: 275,
            height: 280,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    salvarNovoCliente()
                    xmNovoCliente.close()
                  },
                },
              },

            onClose: ()=>{
                $('#novo-cliente-input').val('')
                $('#novo-telefone-input').val('')
                xgClientes.focus()
            }
        })
        
        xmEditarCliente = new xModal.create({
            el: "#xmModalEditarCliente",
            title: "Editar Cliente",
            width: 275,
            height: 280,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    salvarEdicaoCliente()
                    xmEditarCliente.close()
                  },
                },
            },
            onClose: ()=>{
                $('#editar-cliente-input').val('')
                $('#editar-telefone-input').val('')
                xgClientes.focus()
            }
        })
    }

    return {
        grid: grid,
        criarModal: criarModal,
        salvarNovoCliente: salvarNovoCliente,
        deletarCliente: deletarCliente,
        salvarEdicaoCliente: salvarEdicaoCliente,
    }
})();