let xgCampanhas
let xmNovaCampanha
let xmEditarCampanha

$(function () {

    campanhas.grid()
    campanhas.criarModal()

    $("#pagina").val('campanhas')

    $( ".actual-page-bg" ).removeClass( "actual-page-bg" );
    $( ".actual-page-icon" ).removeClass( "actual-page-icon" );
    
    $( "#page-campanhas" ).addClass( "actual-page-bg" );
    $( "#page-campanhas-icon" ).addClass( "actual-page-icon" );

    $('.btn-novo').click(()=>{
        xmNovaCampanha.open()
        $('#nova-campanha-input').focus()
    })

    $('.btn-deletar').click(()=>{
        campanhas.deletarCampanha()
    })

    $('#nova-campanha-input').keydown((e)=>{
        let key = e.which

        if(key === 13) {
            campanhas.salvarNovaCampanha()
            xmNovaCampanha.close()
        }

    })


    $('#editar-campanha-input').keydown((e)=>{
        let key = e.which

        if(key === 13) {
            campanhas.salvarEdicaoCampanha()
            xmEditarCampanha.close()
        }

    })

    $("#buscar-campanhas").keydown((e)=>{
        let key = e.which

        if(key === 13) {
            let search = $("#buscar-campanhas").val().toUpperCase().trim()

            xgCampanhas.queryOpen({ search: search })
        }

        
    })

    xgCampanhas.queryOpen({ search: '' })
});


var campanhas = (function () {

    const url = './per.campanhas.php';

    let campanha = {
        id_campanha: '',
        nome_campanha: '',
    }

    function grid(){
        xgCampanhas = new xGridV2.create({
            el: "#xgCampanhas",
            height: 450,
            heightLine: 27,
            width: "90%",
            theme: "x-clownV2",
            columns: {
                "Campanha":{
                    dataField: "nome_campanha",
                },
            },

            onKeyDown: {
                46: (ln) => {
                    campanha = ln

                    deletarCampanha();
                },
                13: (ln) => {

                    campanha.id_campanha = ln.id_campanha
                    campanha.nome_campanha = ln.nome_campanha

                    $('#editar-campanha-input').val(campanha.nome_campanha)

                    xmEditarCampanha.open()

                    $('#editar-campanha-input').focus()
                },
            },

            onSelectLine: (ln) =>{
                campanha = ln
            },

            dblClick: (ln) => {
                if (ln == false) return false;

                campanha = ln

                $('#editar-campanha-input').val(campanha.nome_campanha)

                xmEditarCampanha.open()

                $('#editar-campanha-input').focus()
            },

            query: {
                execute: (r) => {
                    getCampanhas(r.param.search, r.offset)
                },
            }
        })
    }

    function getCampanhas(search, offset) {
        axios.post(url, {
            call: 'getCampanhas',
            param: {search: search, offset: offset}
        })
        .then(r => {

            xgCampanhas.querySourceAdd(r.data);

            if (r.data[0])
                xgCampanhas.focus();
        })
    }

    function salvarNovaCampanha(){

        campanha.id_campanha = ''
        campanha.nome_campanha = $('#nova-campanha-input').val().toUpperCase().trim()

        inserirCampanha()
    }

    function salvarEdicaoCampanha(){

        campanha.nome_campanha = $('#editar-campanha-input').val().toUpperCase().trim()
        inserirCampanha()
    }

    function deletarCampanha(){

        confirmaCodigo({
            msg: "Digite o código abaixo para EXCLUIR o campanha '"+ campanha.nome_campanha + "'.",
            call: ()=>{
                if(campanha.id_campanha === "" || campanha.id_campanha === null){
                    show("CAMPANHA NÃO IDENTIFICADA!")
                    return false;
                }
        
                axios.post(url, {
                    call: 'deletarCampanha',
                    param: campanha.id_campanha
                })
                .then(r => {
        
                    if(r.data === 1) {
        
                        show("EXCLÚIDO COM SUCESSO!")
                        xgCampanhas.deleteLine()
                    }
        
                    else show("ERRO INTERNO! VERIFIQUE SE A CAMPANHA POSSUI CLIENTES RELACIONADOS.")
                })
               
            }
        })

        
    }

    function inserirCampanha(){

        if(campanha.nome_campanha === null || campanha.nome_campanha === ""){
            setTimeout(() => {
                show("NOME DA CAMPANHA INVÁLIDO!")
            }, 1);
            
            return false
        }

        axios.post(url, {
            call: 'setCampanhas',
            param: {
                id_campanha: campanha.id_campanha, 
                nome_campanha: campanha.nome_campanha, 
            }
        })
        .then(r => {

            if (r.data >= 1){

                xgCampanhas.queryOpen({search: ''})

                campanha = {
                    id_campanha : '',
                    nome : '',
                    edicao : '',
                }

                show("CAMPANHA CADASTRADO COM SUCESSO!")
            }

            if(r.data === 'EDITADO'){

                xgCampanhas.dataSource('nome_campanha', campanha.nome_campanha)

                show("CAMPANHA EDITADA COM SUCESSO!")
            }

            if (r.data === "CADASTRADO"){
                show("CAMPANHA JÁ CADASTRADA!")
            }

            if (r.data === "ERRO"){
                show("ERRO INTERNO!")
            }
        })
    }

    function criarModal(){
        xmNovaCampanha = new xModal.create({
            el: "#xmModalNovaCampanha",
            title: "Nova Campanha",
            width: 275,
            height: 200,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    salvarNovaCampanha()
                    xmNovaCampanha.close()
                  },
                },
              },

            onClose: ()=>{
                $('#nova-campanha-input').val('')

                xgCampanhas.focus()
            }
        })
        
        xmEditarCampanha = new xModal.create({
            el: "#xmModalEditarCampanha",
            title: "Editar Campanha",
            width: 275,
            height: 200,

            buttons: {
                btn1: {
                  html: "Confirmar",
                  click: () => {
                    
                    salvarEdicaoCampanha()
                    xmEditarCampanha.close()
                  },
                },
            },
            onClose: ()=>{
                $('#editar-campanha-input').val('')

                xgCampanhas.focus()
            }
        })
    }

    /*function getExemplo() {
        axios.post(url, {
            call: 'exemplo'
        })
            .then(r => {
                (r);
            })
    }*/

    return {
        grid: grid,
        criarModal: criarModal,
        salvarNovaCampanha: salvarNovaCampanha,
        deletarCampanha: deletarCampanha,
        salvarEdicaoCampanha: salvarEdicaoCampanha,
    }
})();
