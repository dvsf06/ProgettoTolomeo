<?php
    //include 'connectDb.php'
    $host = 'localhost';
    $db = "dbForseSpotify";

    try {
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";
        $pdo = new PDO($dsn, "root");

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connesso al db";

    } catch (PDOException $e) {
        echo "Error while connecting to database: " . $e->getMessage();
    }


    if(1){
        $user = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $passwordConf = $_POST["passwordConfirm"];


        try {
            $query = $pdo->prepare("INSERT INTO tblUtenti (username, email, passwordHash) VALUES (:username, :email, :passwordHash)");

            $query->bindParam(':username', $username);
            $query->bindParam(':email', $email);
            $query->bindParam(':passwordHash', password_hash($password));

            $query->execute();
            echo "damn";
        }
        catch(PDOException $e){
            echo "Errore durante l'inserimento: " . $e->getMessage();
        }

        
    }
?>