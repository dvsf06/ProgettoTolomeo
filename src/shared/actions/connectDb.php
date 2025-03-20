<?php
    $host = 'localhost';
    $db = "dbForseSpotify";

    try {
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";
        $db = new PDO($dsn, "root", "");

        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    } catch (PDOException $e) {
        exit("Error while connecting to database: " . $e->getMessage());
    }
?>