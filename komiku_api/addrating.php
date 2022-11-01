<?php
//agar bisa diakses oleh semua device
header("Access-Control-Allow-Origin: *");

$arr = null;
$connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

if ($connection->connect_error) {
    $arr = ["result" => "error", "message" => "unable to connect to server"];
} else {
    
        if (isset($_POST['id']) && isset($_POST['email']) && isset($_POST['rating'])) {
            $data = [];
            $id = $_POST['id'];
            $email = $_POST['email'];
            $rating = $_POST['rating'];

            // $arr = ["result" => "success", "data" => $data, "post_id" => "masuk"];
            $sql = "SELECT * FROM user_rating WHERE user_rating.comics_id= '$id' AND user_rating.users_email= '$email'";

            $stmt = $connection->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
            //baca data perbaris
                $sqlupdate = "UPDATE user_rating SET user_rating.rate = '$rating' WHERE user_rating.comics_id = '$id' AND user_rating.users_email='$email'";
                $stmtupdate = $connection->prepare($sqlupdate);
                $stmtupdate->execute();
                
                
                if($rowupdate = $stmtupdate->affected_rows > 0){
                    
                    // $data = mysqli_fetch_assoc($result);
                // $data = mysqli_fetch_assoc($result);

                    $sql = "SELECT * FROM user_rating WHERE user_rating.comics_id= '$id' AND user_rating.users_email= '$email'";

                    $stmt = $connection->prepare($sql);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    $data = mysqli_fetch_assoc($result);


                    $arr = ["result" => "successupdate", "data" => $data];
                }
                else{
                    $arr = ["result" => "failed", "data" => $data];

                }

    
            }
            else{

                $sqlinsert = "INSERT INTO user_rating (comics_id, users_email, rate) VALUES ('$id', '$email',  '$rating')";
                $stmtinsert = $connection->prepare($sqlinsert);
                $stmtinsert->execute();

                if ($row = $stmtinsert->affected_rows > 0) {
                    $arr = ["result" => "successinsert"];
                }
            }

        }
    echo json_encode($arr);
    $stmt->close();
    $connection->close();
}
