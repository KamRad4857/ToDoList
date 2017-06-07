 <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

 $json = file_get_contents('php://input');

try {

      $json = json_decode($json, true);
      $todo=$json['text'];
      $user=$json['user'];
      $userId = $json['userId'];
      $completeTime = $json['completeTime'];

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO todo VALUES ( 0 , '$todo', '$userId', null, '$completeTime')";
    // use exec() because no results are returned
    $conn->exec($sql);
     echo "{\"message\":\"New record created successfully\"}";

    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>