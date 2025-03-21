<?php
    include "connectDb.php";

    if(isset($_GET["getUserPlaylists"])){
        try{
            $query = $db->prepare("SELECT tblPlaylists.* FROM tblPlaylists INNER JOIN tblUtenti ON tblPlaylists.utenteId = tblUtenti.idUtente WHERE tblUtenti.idUtente = :userId");
            $query->bindParam(":userId", $_GET["userId"]);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            $jsonResult = json_encode($result);
            echo $jsonResult;
        }
        catch (PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }
?>