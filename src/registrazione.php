<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrati</title>
    <link rel="stylesheet" href="assets/styleMain.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body style="padding-top: 50px !important;">
    <div class="container-md">
        <form class="formCenter" action="shared/actions/userHandling.php" method="POST" style="padding-bottom: 50px;">
            <img src="assets/images/logo.png" height="200px">
            <div class="mb-3">
                <label for="usernameInput" class="form-label">Username</label>
                <input type="text" class="form-control" id="usernameInput" name="username" placeholder="Username">
            </div>
            <div class="mb-3">
                <label for="emailInput" class="form-label">Email</label>
                <input type="email" class="form-control" id="emailInput" name="email" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="passwordInput" class="form-label">Password</label>
                <input type="password" class="form-control" id="passwordInput" name="password" placeholder="Password">
            </div>
            <div class="mb-3">
                <label for="passwordConfirmInput" class="form-label">Conferma password</label>
                <input type="password" class="form-control" id="passwordConfirmInput" name="passwordConfirm" placeholder="Password">
            </div>
            
            <div class="mb-3">
                <label for="authCode" class="form-label">Auth-Code</label>
                <input type="password" class="form-control" id="authCodeInput" name="authCode" placeholder="auth-code">
            </div>

            <p>Hai già un account? <a href="index.php">Accedi</a></p>
            <button type="submit" class="btn btn-primary" name="registrazione" value="1">Registrati</button>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>