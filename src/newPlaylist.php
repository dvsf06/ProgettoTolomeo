<?php
    session_start();
    if(!isset($_SESSION["idUtente"])){
        header("Location: index.php");
    }
    else{
        setcookie("idUtente", $_SESSION["idUtente"]);
    }

    if(!isset($_SESSION["mode"])){
        $_SESSION["mode"] = "dark-mode";
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crea playlist</title>
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">

    <link rel="stylesheet" href="assets/playerStyle.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styleMain.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body class="<?php echo $_SESSION["mode"] ?>">
    <?php include 'shared/navbar.php'?>
    <form class="formCenter">
        <div class="mb-3">
            <label for="coverFileInput" class="form-label">Copertina playlist</label>
            <input class="form-control" type="file" id="coverFileInput">
        </div>
        <div class="mb-3">
            <label for="nameInput" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nameInput" name="name" placeholder="Nome playlist">
        </div>
            <button type="button" class="btn btn-danger">Annulla</button>
            <button type="button" class="btn btn-primary" onclick="creaClick()">Crea</button>
        </form>
    <?php include 'shared/footer.php'?>
    <script src="assets/scripts/creaPlScript.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>