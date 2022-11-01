<?php
//agar bisa diakses oleh semua device
header("Access-Control-Allow-Origin: *");

$arr = null;
$connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

if ($connection->connect_error) {
    $arr = ["result" => "error", "message" => "unable to connect to server"];
} else {

    if (isset($_POST['id']) && isset($_POST['email'])) {
        $id = $_POST['id'];
        $email = $_POST['email'];
        $sql = "INSERT INTO user_favorite (user_email, comic_id) VALUES ('$email', $id)";
    }

    $stmt = $connection->prepare($sql);
    $stmt->execute();

    if($row = $stmt->affected_rows > 0){
        $arr = ["result" => "success"];

    }
    else{
        $arr = ["result" => "failed", "message" => "sql error: $sql"];

    }
    

    echo json_encode($arr);
    $stmt->close();
    $connection->close();
}
