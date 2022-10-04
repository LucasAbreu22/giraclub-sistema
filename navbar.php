<link rel="shortcut icon" href="../css/img/icon.png">

<link rel="stylesheet" href="../css/reset.css">
<link rel="stylesheet" href="../css/index.css">

<script src="./js/jquery-2.2.1.min.js" type="text/javascript"></script>
<script src="../js/jquery-2.2.1.min.js" type="text/javascript"></script>


<script src="../plugins/xGridV2/xGridV2.js" type="text/javascript"></script>
<link rel="stylesheet" href="../plugins/xGridV2/xGridV2.css" type="text/css" />

<script src="../plugins/xModal/xModal.js" type="text/javascript"></script>
<link rel="stylesheet" href="../plugins/xModal/xModal.css" type="text/css" />

<script src="../plugins/modais.js" type="text/javascript"></script>
<script src="../plugins/util.js" type="text/javascript"></script>

<script src="../plugins/xPrint/xPrint.js" type="text/javascript"></script>

<script src="../plugins/axios.min.js" type="text/javascript"></script>

<script src="../plugins/jquery.maskMoney.js" type="text/javascript"></script>
<script src="../plugins/jquery.mask.min.js" type="text/javascript"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/xlsx.full.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.13.5/jszip.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="sidebar">
    <div id="links">
        <a href="../home/home.php" id="link-page-home" class="icons-page">
            <div class="background-icon" id="page-home">
                <i class="fa-solid fa-magnifying-glass" id="page-home-icon"></i>
            </div>
        </a>
        <a href="../clientes/clientes.php" id="link-page-clientes" class="icons-page">
            <div class="background-icon" id="page-clientes">
                <i class="fa-solid fa-user" id="page-clientes-icon"></i>
            </div>
        </a>
        <a href="../campanhas/campanhas.php" id="link-page-campanhas" class="icons-page">
            <div class="background-icon" id="page-campanhas">
                <i class="fa-solid fa-book-bookmark" id="page-campanhas-icon"></i>
            </div>
        </a>
    </div>
    <div id="saida" class="btn-sair">
        <div class="background-saida">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </div>
    </div>
</div>

<div id="xmImportPlanilha">
    <div class="content-modal"> 
        <input type="file" name="" id="uploadPlanilha" hidden>
        <label id="labelImportPlanilha">IMPORTAR PLANILHA <i class="fa-solid fa-file-arrow-up"></i></label>
        
        <label id="labelModelPlanilha"><a href="../excel/modeloExcel.xlsx">BAIXAR MODELO PLANILHA <i class="fa-solid fa-file-arrow-down"></i></a></label>
    </div>
</div>

<div id="xmBackup">
    <div class="content-modal">
        <form action="../backup/import_backup.php" name="form-banco" method="post" enctype="multipart/form-data">
            <input type="file" name="arquivo-banco" id="uploadBanco" hidden>
            <input id="pagina" name="pagina" value="" hidden>
            <label id="labelImportBanco" >IMPORTAR BANCO DE DADOS <i class="fa-solid fa-file-arrow-up"></i></label>
            <input type="submit" id="button-submit-banco" hidden>
        </form> 

        <label id="labelExportBanco" >BAIXAR BANCO DE DADOS <i class="fa-solid fa-file-arrow-down"></i></label>

    </div>
</div>

<div id="xmConfirmaSenha">
    <div class="content-modal"> 
        <br>
        <label id="label-modal">Digite sua senha para prosseguir</label><br>
        <input type="password" class="input-model" id="confirmaSenha">
    </div>
</div>

<script src="../js/index.js" type="text/javascript"></script>
<script src="../excel/excel.js" type="text/javascript"></script>
<script src="../backup/backup.js" type="text/javascript"></script>
<script src="./js/index2.js" type="text/javascript"></script>
