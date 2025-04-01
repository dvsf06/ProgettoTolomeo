<?php
    session_start();
    error_log("a");

    if(isset($_GET["setSession"])){
        $_SESSION[$_GET["key"]] = $_GET["value"];
        echo "200";
    }

    if(isset($_GET["getSession"])){
        echo $_SESSION[$_GET["key"]];
    }
?>