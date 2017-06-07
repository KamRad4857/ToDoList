<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";
$json= file_get_contents('php://input');
try {
  $json = json_decode($json, true);
      $name = $json['name'];
      $surname = $json['surname'];
      $login = $json['login'];
      $pass = $json['password'];
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO user VALUES ( 0 , '".$name."', '".$surname."', '".$login."', '".$pass."')";
    // use exec() because no results are returned
    $conn->exec($sql);
     echo "{\"message\":\"New record created successfully\"}";
    }
catch(PDOException $e)
    {
         echo "{\"message\":\"Error during creating user. Choose a different login.\",\"user\":\"".$name."\"}";
    }
$conn = null;
?>
