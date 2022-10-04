let calc;
let usuario;
const login = new Login();

$(function () {

    $('.TELEFONE').keydown(e => {
        let digits = $('.TELEFONE').val().replace(/[^0-9]/g, "").length
        $('.TELEFONE').mask('(00) 0 0000-0000');
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


});

function Login() {

    this.session = function () {
        axios.post('./login/per.login.php', {
            call: 'session',

        }).then(r => {

            if (r.data === "sem_login") {
                usuario = '';
                // pnLogin.open()
                window.location.href = "./login/index.html";
                return false
            }

            usuario = r.data

        })
    }

    this.sair = function () {

        axios.post(`./login/per.login.php`, {
            call: 'sair',

        }).then(r => {
            login.session()

        })

    };

}

login.session();