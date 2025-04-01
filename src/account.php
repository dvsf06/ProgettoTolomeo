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
    <title>Account</title>

    <link rel="stylesheet" href="assets/cardStyle.css">
    <link rel="stylesheet" href="assets/playerStyle.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styleMain.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body style="padding-top: 100px !important;">
    <?php include 'shared/navbar.php'?>
    <div class="container-md" id="mainContainer">
        <div class="formCenter" style="padding-bottom: 20px; margin-bottom: 100px;">
            <img src="assets/images/accountPlaceholder.png" height="30vh" style="padding: 15px 15px;">
            <div>
                <div class="mb-3">
                    <label for="usernameInput" class="form-label">Username</label>
                    <input type="text" class="form-control" id="usernameInput" name="username" placeholder="<?php echo($_SESSION["username"]); ?>" disabled>
                </div>
                <div class="mb-3">
                    <label for="emailInput" class="form-label">Email</label>
                    <input type="email" class="form-control" id="emailInput" name="email" placeholder="<?php echo($_SESSION["email"]); ?>" disabled>
                </div>
                <button class="btn btn-danger" onclick="logoutClick()">Logout</button>
            </div>
        </div>
    </div>
    <script src="assets/scripts/accountScript.js"></script>
    <?php include 'shared/footer.php'?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>