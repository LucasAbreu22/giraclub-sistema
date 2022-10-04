let xmConfirmaSenha
let evento = ''

$(function () {

    backup.modal()
    
    $("#uploadBanco").val('')

    $('#uploadBanco').change(()=>{
        var fileUpload = $("#uploadBanco")[0].files
        let typeFile = fileUpload[0].name.indexOf('.sql')


        if(typeFile === -1){
            show("ARQUIVO INVÁLIDO DE BANCO!")
            $("#uploadBanco").val('')
            return false
        }
 
        $('#button-submit-banco').click()
        
    })

    $('#labelImportBanco').click(()=>{

        evento = 'importar'
        xmConfirmaSenha.open()

    })

    $('#labelExportBanco').click(()=>{
        evento = 'exportar'
        xmConfirmaSenha.open()
        
    })

    $('#confirmaSenha').keydown((e)=>{
        let key = e.which

        if(key === 13)  backup.validarSenha()

    })
});


var backup = (function () {

    let url = '../backup/per.backup.php'

    function validarSenha(){

        let senha = $('#confirmaSenha').val()

        axios.post(url, {
            call: 'confirmaSenha',
            param: senha,
        })
        .then(r => {
            let validacao = r.data
        
            if(validacao === 0){
                show('SENHA INVÁLIDA!')
                
                return false
            }

            if(evento === 'exportar'){
                exportarBanco()
            }
            if(evento === 'importar'){
                $('#uploadBanco').click()
            }
        })
    }

    function exportarBanco() {

        axios.post(url, {
            call: 'exportarBanco'
        })
        .then(r => {
            download('../backup/bakup_giraclubedb.sql', 'bakup_giraclubedb.sql')
        })

        
    }

    function download(uri, name) {

        var link = document.createElement("a");

        link.setAttribute('download', name);
        link.href = uri;

        document.body.appendChild(link);

        link.click();
        link.remove();

       excluirArquivo()
    }

    function excluirArquivo(){

        axios.post(url, {
            call: 'excluirArquivo'
        })
        .then(r => {
           
        })
    }

    function modal(){
        xmConfirmaSenha = new xModal.create({
            el: "#xmConfirmaSenha",
            title: "Confirmar Senha",
            width: 300,
            height: 170,
    
            onClose: ()=>{
                $('#confirmaSenha').val('')
            }
        })
    }

    return {
        validarSenha: validarSenha,
        modal: modal,
    }
})();
