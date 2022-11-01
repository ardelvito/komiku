<?php
//agar bisa diakses oleh semua device
header("Access-Control-Allow-Origin: *");

$arr = null;
$connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

if ($connection->connect_error) {
    $arr = ["result" => "error", "message" => "unable to connect to server"];
} else {

    if (isset($_POST['id']) && isset($_POST['email']) && isset($_POST['comment'])) {
        $id = $_POST['id'];
        $email = $_POST['email'];
        $comment = $_POST['comment'];
        
        // $sql = "INSERT INTO user_favorite (user_email, comic_id) VALUES ('$email', $id)";
        $sql = "INSERT INTO comments (comic_id, user_email, text, date) VALUES ('$id', '$email',  '$comment', NOW())";

    }

    $stmt = $connection->prepare($sql);
    $stmt->execute();

    if ($row = $stmt->affected_rows > 0) {

        $sqlgetdate = "SELECT MAX(id), comments.date FROM comments";
        $stmtgetdate = $connection->prepare($sqlgetdate);
        $stmtgetdate->execute();
        $resultdate = $stmtgetdate->get_result();

        if ($resultdate->num_rows > 0) {
            $data = [];
            $date = mysqli_fetch_assoc($resultdate);
            array_push($data, $date);
            $arr = ["result" => "success", "data" => $data];
        }

    } else {
        $arr = ["result" => "failed", "message" => "sql error: $sql"];
    }


    echo json_encode($arr);
    $stmt->close();
    $connection->close();
}
