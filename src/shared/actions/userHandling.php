<?php
    include 'connectDb.php';

    if(isset($_POST["registrazione"])){
        try{
            $user = $_POST["username"];
            $email = $_POST["email"];
            $password = $_POST["password"];
            $passwordConf = $_POST["passwordConfirm"];
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            if($password != $passwordConf){
                exit("Le password non coincidono");
            }

            $query = $db->prepare("SELECT username FROM tblUtenti WHERE username = :username");
            $query->bindParam(":username", $user);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            if($user == $result[0]["username"]){
                exit('Utente già esistente, <a href="../../index.php">accedi</a>');
            }
            
            $query = $db->prepare("INSERT INTO tblUtenti (username, email, passwordHash) VALUES (:username, :email, :passwordHash)");
            $query->bindParam(":username", $user);
            $query->bindParam(":email", $email);
            $query->bindParam(":passwordHash", $passwordHash);

            $query->execute();
            echo 'Utente inserito, <a href="../../index.php">accedi</a>';
        }
        catch(PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    if(isset($_POST["accesso"])){
        try{
            $email = $_POST["email"];
            $password = $_POST["password"];

            $query = $db->prepare("SELECT * FROM tblUtenti WHERE email = :email");
            $query->bindParam(":email", $email);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            if($email != $result[0]["email"]){
                exit('Utente non esistente, <a href="../../registrazione.php">registrati</a>');
            }
            if(password_verify($password, $result[0]["passwordHash"])){
                exit("Accesso eseguito, ciao ".$result[0]["username"]);
            }
            else{
                exit("Password errata");
            }

            exit("Condizione non gestita");

        }
        catch(PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }
?>