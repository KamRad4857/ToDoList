<?php
   session_start();
   $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "todolist";
   $conn = new mysqli($servername, $username, $password, $dbname);
   if ($conn->connect_error) {
       die("Connection failed: " . $conn->connect_error);
   }
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form
      $json = file_get_contents('php://input');
      $json = json_decode($json, true);
      $username=$json['username'];
      $password=$json['password'];
      $myusername = mysqli_real_escape_string($conn,$username);
      $mypassword = mysqli_real_escape_string($conn,$password);
      $sql = "SELECT userid FROM user WHERE login = '$myusername' and password = '$mypassword'";
$result = $conn->query($sql);
$id;
$count = 0;
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
    $id =  $row["userid"];
    $count = $count +1;
    }
}
$conn->close();
}   if($count == 1) {
    // output data of each row
    $rows = [];
       if ($result->num_rows > 0) {
           while($row = $result->fetch_assoc()) {
                $id = $row;
           }
       }
       echo "{\"message\":\"Login completed successfully\",\"user\":\"".$username."\",\"id\":\"".$id."\"}";
                $_SESSION['login_user'] = $username;
      }else if($count!=1){
       echo "{\"message\":\"INCORECT USER or PASSWORD\"}";
         $error = "Your Login Name or Password is invalid";
      }
?>
