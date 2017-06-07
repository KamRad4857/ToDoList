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
$id = $_GET["user"];
$sql = "SELECT * FROM todo where userid = {$id}";
$result = $conn->query($sql);
 $rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
         $rows[] = $row;
    }
 print json_encode($rows);
} else {
echo "{\"message\":\"there is no data\",\"user id\":\"".$id."\"}";}
$conn->close();

?>
