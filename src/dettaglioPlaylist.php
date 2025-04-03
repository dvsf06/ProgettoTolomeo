<?php
    session_start();
    if(!isset($_SESSION["idUtente"])){
        header("Location: index.php");
    }
    else{
        setcookie("idUtente", $_SESSION["idUtente"]);
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playlist</title>
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">

    <link rel="stylesheet" href="assets/playerStyle.css">
    <link rel="stylesheet" href="assets/styleSearch.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styleMain.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body style="padding-bottom: 150px !important;">
    <?php include 'shared/navbar.php'?>
    <div class="container-md mtn" id="mainContainer">
        <h1 class="mainTitle" style="text-align: center;"><?php echo $_GET["nome"] ?></h1>
        <div>
            <button class="btn btn-success center btn-play-all" onclick="playPlaylist()"><i class="bi bi-play-fill h1"></i></button>
            <table class="table" data-bs-theme="dark">
                <tbody id="risBrani">
                </tbody>
            </table>
        </div>
    </div>
    <?php include 'shared/footer.php'?>
    <script>
        var currPlaylist = <?php echo $_GET["id"] ?>
    </script>
    <script src="assets/scripts/playlistScript.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>