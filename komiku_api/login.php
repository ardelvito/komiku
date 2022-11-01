<?php
    header("Access-Control-Allow-Origin: *");
    $arr = null;
    $servername = "localhost";
    $username = "hybrid_160420030";
    $password = "ubaya";
    $dbname = "hybrid_160420030";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    $arr= ["result"=>"error","message"=>"unable to connect"];
    }

    extract($_POST);
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "SELECT * FROM users where username='$username' and password='$password'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
    $data=mysqli_fetch_assoc($result);
    $arr=["result"=>"success", "data"=>$data];
    } else {
    $arr= ["result"=>"error","message"=>"sql error: $sql"];
    }
    echo json_encode($arr);

?>