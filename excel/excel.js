$(function () {
    
  $('#uploadPlanilha').change(()=>{
    planilha.lerPlanilha()
  })
  
});


var planilha = (function () {

    let url = "../excel/per.excel.php"

    function lerPlanilha (){
        var fileUpload = $("#uploadPlanilha")[0]

        let typeFile = fileUpload.files[0].type

        if(typeFile != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            show("ARQUIVO DIFERENTE DE EXCEL!")
            $("#uploadPlanilha").val('')
            return false
        }
 
        //Validate whether File is valid Excel file.
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
 
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        GetTableFromExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                       GetTableFromExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
                $("#uploadPlanilha").val('')
            }
    }

    function GetTableFromExcel(data) {
        //Read the Excel File data in binary
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
 
        //get the name of First Sheet.
        var Sheet = workbook.SheetNames[0];
 
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);
 
        for(let i in excelRows){

            if(!!excelRows[i].NOME === false){
                setTimeout(() => {
                    show("PLANILHA COM DADO DE NOME FALTANDO!")
                    $("#uploadPlanilha").val('')
                    return false
                }, 1);
            }

            if(!!excelRows[i].TELEFONE === false){
                setTimeout(() => {
                    show("PLANILHA COM DADO DE TELEFONE FALTANDO!")
                    $("#uploadPlanilha").val('')
                    return false
                }, 1);
            }

            if(!!excelRows[i].VALOR === false){
                setTimeout(() => {
                    show("PLANILHA COM DADO DE VALOR FALTANDO!")
                    $("#uploadPlanilha").val('')
                    return false 
                }, 1);
            }

            if(!!excelRows[i].CAMPANHA === false){
                setTimeout(() => {
                    show("PLANILHA COM DADO DE CAMPANHA FALTANDO!")
                    $("#uploadPlanilha").val('')
                    return false
                }, 1);

            }

        }
        validarDadosPlanilha(excelRows)
        
    };

    function validarDadosPlanilha(excelRows) {
        axios.post(url, {
            call: 'validarDadosPlanilha',
            param: {excelRows: excelRows}
        })
        .then(r => {
            $("#uploadPlanilha").val('')

            show(r.data)
        })
    }
    return {
        lerPlanilha:lerPlanilha,
    }
})();
