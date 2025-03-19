<?php
    $host = 'localhost';
    $db = "dbForseSpotify";

    try {
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";
        $pdo = new PDO($dsn);

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connesso al db";

    } catch (PDOException $e) {
        echo "Error while connecting to database: " . $e->getMessage();
    }
?>