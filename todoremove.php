<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$id = $_GET["id"];
// sql to delete a record
$sql = "DELETE FROM todo WHERE todoid= ".$id."";
if ($conn->query($sql) === TRUE) {
    echo "{\"message\":\"Record deleted successfully\", \"id\":\" ".$id." \"}";
} else {
    echo "{\"message\":\"Deleting record Error: . $conn->error\"}";
}
$conn->close();
?> 