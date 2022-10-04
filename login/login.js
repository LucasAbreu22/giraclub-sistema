// const login = new Login();
$(function () {
    login.logar()
    $('#edtLogin').focus()

    $('#edtLogin').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#edtSenha').focus()
        }
    })

    $('#edtSenha').keydown(function (e) {
        if (e.keyCode == 13) {
            $('#btnLogar').click()
            
        }
    })
});

const login = (function () {

    this.logar = function () {

        $('#btnLogar').click(function () {

            let login = $('#edtLogin').val()
            let senha = $('#edtSenha').val()

            axios.post('per.login.php', {
                call: 'getLogin',
                param: {
                    login: login,
                    senha: senha,
                }
            }).then(r => {

                if (r.data.msg) {
                    show(r.data.msg)
                    return false
                }
                
                usuario = r.data
                
                window.location = "../home/home.php";

            })
        })
    }


    return {
        logar: this.logar
    }
})();
