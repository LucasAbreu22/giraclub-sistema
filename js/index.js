let usuario;
let xmImportPlanilha
let xmBackup

const login = new Login();

$(function () {

    importarPlanilha()

    $('.TELEFONE').keydown(e => {
        let digits = $('.TELEFONE').val().replace(/[^0-9]/g, "").length
        
        if (digits == 9) {
            $('.TELEFONE').mask('(00) 0000-0000');
        }
        else if ($('.TELEFONE').val()[2] == '8' && digits == 10) {
            $('.TELEFONE').mask('0000 000 0000');
        }
        else if (digits == 10) {
            $('.TELEFONE').mask('(00) 0 0000-0000');
        }
        else if ($('.TELEFONE').val()[2] == '8') {
            $('.TELEFONE').mask('0000 000 0000');
        }
    })

    $('.real').maskMoney({ thousands: '.', decimal: ',', allowZero: true });
    $('.date').mask('00/00/0000');
    $('.numeroNota').mask('000.000.000');
    $('.CPF').mask('999.999.999-99');
    $('.chave').mask('0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000');
    $('.CNPJ').mask('99.999.999/9999-99');
    $('.CEP').mask('00.000-000');
    $('.inteiro').maskMoney({ thousands: '.', decimal: ',', precision: 0, allowZero: true });

    $('.btn-sair').click(function () {
        login.sair()

    })

    $('body').keydown((key)=>{

        if(key.which === 73 && key.ctrlKey){
            xmImportPlanilha.open()
        }

        if(key.which === 66 && key.ctrlKey){
            xmBackup.open()
        }
    })

    $("#confirmaSenha").keydown((e)=>{
        let key = e.which

        if(key === 13)  confirmarSenha()
        
    })

    $('#labelImportPlanilha').click(()=>{

        $('#uploadPlanilha').click()
    })

    $('#labelImportPlanilha').click(()=>{

        $('#downloadBanco').click()
    })

});

function Login() {

    this.session = function () {
        axios.post('../login/per.login.php', {
            call: 'session',

        }).then(r => {

            if (r.data === 'sem_login') {
                usuario = '';
                // pnLogin.open()
                window.location.href = "../login/index.html";
                return false
            }

            usuario = r.data

        })
    }

    this.sair = function () {

        axios.post(`../login/per.login.php`, {
            call: 'sair',

        }).then(r => {
            login.session()

        })

    };

}

function confirmarSenha(){

    let senha = $('#confirmaSenha').val()

    if(senha === null || senha === "" || senha === undefined){
        setTimeout(() => {
            show("CAMPO DE SENHA VAZIO")
        }, 1);

        return false
    }

    axios.post(`../backup/per.backup.php`, {
        call: 'confirmaSenha',
        param: senha

    }).then(r => {

        if(r.data === 1){
            xmConfirmaSenha.close()
            xmBackup.open()
        }else{
            show("SENHA INVÁLIDA")
        }

    })
}

function importarPlanilha(){
    xmImportPlanilha = new xModal.create({
        el: "#xmImportPlanilha",
        title: "Importar Planilha",
        width: 270,
        height: 170,

        onClose: ()=>{
            $('#nova-campanha-input').val('')

        }
    })

    xmBackup = new xModal.create({
        el: "#xmBackup",
        title: "Backup",
        width: 300,
        height: 170,

        onClose: ()=>{
            $('#uploadBanco').val('')
            $('#downloadBanco').val('')

        }
    })
}

login.session();