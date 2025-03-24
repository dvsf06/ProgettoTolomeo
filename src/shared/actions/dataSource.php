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

    if(isset($_GET["search"])){
        try{
            $titolo = strtolower($_GET["titolo"]);
            $query = $db->prepare("SELECT * FROM tblBrani INNER JOIN tblArtisti ON tblBrani.artistaId = tblArtisti.idArtista WHERE titolo = :titolo");
            $query->bindParam(":titolo", $titolo);
            $query->execute();
            $resultDb = $query->fetchAll(PDO::FETCH_ASSOC);
            
            $host = "192.168.1.225";
            $port = 8000;
            $socket = socket_create(AF_INET, SOCK_STREAM, 0);
            $res = socket_connect($socket, $host, $port);
            $sentString = '{"action":"search","data":"'.$_GET["titolo"].'"}';
            socket_write($socket, $sentString, strlen($sentString));
            $resultApi = "";
            while($resp = socket_read($socket, 1024)){
                $resultApi .= $resp;
                if(strpos($resultApi, "\n") !== false) break;
            }

            $resultApi = json_decode(rtrim($resultApi, "\n"), true);

            foreach ($resultApi["items"] as $itemApi){
                foreach ($resultDb as $itemDb){
                    if(strtolower($itemApi["name"]) == $itemDb["titolo"] && $itemApi["artists"][0]["name"] == $itemDb["nome"]){                  
                        $resultApi["items"][array_search($itemApi, $resultApi["items"])]["downloaded"] = true;
                    }
                }
            }

            $jsonResult = json_encode($resultApi);
            echo $jsonResult;
        }
        catch (PDOException $e){
            echo "Error: " . $e->getMessage();
        }
    }

    if(isset($_GET["download"])){
        $host = "192.168.1.225";
        $port = 8000;
        $socket = socket_create(AF_INET, SOCK_STREAM, 0);
        $res = socket_connect($socket, $host, $port);
        $sentString = '{"action":"download","data":"'.json_decode($_GET["song"],true)["id"].'","title":"'.json_decode($_GET["song"],true)["name"].'"}';
        socket_write($socket, $sentString, strlen($sentString));
        $resultApi = "";
        while($resp = socket_read($socket, 1024)){
            $resultApi .= $resp;
            if(strpos($resultApi, "\n") !== false) break;
        }

        try{
            $songAssoc = json_decode($_GET["song"], true);

            $filename = "";
            $artists = $songAssoc["artists"];
            foreach ($artists as $artist){
                if($filename == ""){
                    $filename = $artist["name"];
                }
                else{
                    $filename .= ", " . $artist["name"];
                }
                $filename .= " - " . $songAssoc["name"] . ".mp3";
            }

            $nomeArtista = $songAssoc["artists"][0]["name"];

            $titolo = $songAssoc["name"];
            $durata = $songAssoc["duration_ms"];
            $percorsoFile = "tracks/" . $songAssoc["artists"][0]["name"] . "/" . $filename;

            $query = $db->prepare("SELECT * FROM tblArtisti WHERE nome = :artistaNome");
            $query-> bindParam(":artistaNome", $nomeArtista);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            
            $artistaId = -1;

            if($result[0]["nome"] == $nomeArtista){
                $artistaId = $result[0]["idArtista"];
            }
            else{
                $query = $db->prepare("INSERT INTO tblArtisti (nome) VALUES (:nomeArtista)");
                $query->bindParam(":nomeArtista", $nomeArtista);
                $query->execute();

                $artistaId = $db->lastInsertId();
            }   

            if($artistaId != -1){
                $lowerTitolo = strtolower($titolo);
                $query = $db->prepare("INSERT INTO tblBrani (titolo, durata, percorsoFile, artistaId) VALUES (:titolo, :durata, :percorsoFile, :artistaId)");
                $query->bindParam(":titolo", $lowerTitolo);
                $query->bindParam(":durata", $durata);
                $query->bindParam(":percorsoFile", $percorsoFile);
                $query->bindParam(":artistaId", $artistaId);
                $query->execute();
            }
            else{
                throw new Exception("Error on artist Id");
            }
            

        }
        catch (PDOException $e){
            echo "Error: " . $e->getMessage();
        }
        echo $resultApi;
    }
?>