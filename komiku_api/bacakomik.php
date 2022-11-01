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
        $sql = "SELECT * FROM comics WHERE comics.id='$id'";
        
    }

    $stmt = $connection->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        //update views
        $sqlupdate = "UPDATE comics SET comics.total_view = comics.total_view + 1 WHERE comics.id = '$id'";
        $stmtupdate = $connection->prepare($sqlupdate);
        $stmtupdate->execute();

        if ($rowupdate = $stmtupdate->affected_rows > 0) {
            $data = [];
            //baca data perbaris
            $data = mysqli_fetch_assoc($result);

            //query genre
            $sqlgenre = "SELECT * FROM comic_genres INNER JOIN genres on genres.id = comic_genres.genres_id WHERE comic_genres.comic_id ='$id'";
            $stmtcomment = $connection->prepare($sqlgenre);
            $stmtcomment->execute();
            $genre = [];
            $resultgenre = $stmtcomment->get_result();

            while ($rowcomment = mysqli_fetch_assoc($resultgenre)) {
                array_push($genre, $rowcomment);
            }

            $data["genre"] = $genre;

            //query avg_rate
            $sqlavgrating = "SELECT AVG(rate) AS 'avg_rate' FROM user_rating WHERE user_rating.comics_id = '$id' AND 'avg_rate' IS NOT NULL";
            $stmtavgrating = $connection->prepare($sqlavgrating);
            $stmtavgrating->execute();
            $resultavgrating = $stmtavgrating->get_result();
            $dataavgrating = mysqli_fetch_assoc($resultavgrating);


            if (is_null($dataavgrating["avg_rate"])) {
                $defaultavgrating = array("avg_rate" => 0);
                array_push($data, $defaultavgrating);
            } else {
                array_push($data, $dataavgrating);
            }


            //query komik favorit
            $sqlfavorite = "SELECT * FROM user_favorite WHERE user_favorite.comic_id = '$id' AND user_favorite.user_email = '$email'";
            $stmtfavorite = $connection->prepare($sqlfavorite);
            $stmtfavorite->execute();
            $favorite = [];
            $resultfavorite = $stmtfavorite->get_result();
            $datafavorite = mysqli_fetch_assoc($resultfavorite);

            if ($resultfavorite->num_rows > 0) {

                $statusFavorit = array("statusfavorite" => "ya");
            } else {
                $statusFavorit = array("statusfavorite" => "tidak");
            }

            // $datafavorite += $statusFavorit;
            array_push($data, $statusFavorit);

            //query display rating
            $sqldisplayrating = "SELECT * FROM user_rating WHERE user_rating.comics_id='$id' AND user_rating.users_email='$email'";
            $stmtdisplayrating = $connection->prepare($sqldisplayrating);
            $stmtdisplayrating->execute();
            $displayrating = [];
            $resultdisplayrating = $stmtdisplayrating->get_result();

            if ($resultdisplayrating->num_rows > 0) {
                $statusrating = array("statustelahrating" => "ada");
                array_push($displayrating, $statusrating);

                $read = mysqli_fetch_assoc($resultdisplayrating);
                array_push($displayrating, $read);

            } else {
                $statusrating = array("statustelahrating" => "tidakada");
                array_push($displayrating, $statusrating);
            }

            $data["telahrating"] = $displayrating;


            //query comment
            $sqlcomment = "SELECT comments.*, users.username FROM `comments`INNER JOIN users ON comments.user_email = users.email WHERE comments.comic_id = '$id'";
            $stmtcomment = $connection->prepare($sqlcomment);
            $stmtcomment->execute();
            $comment = [];
            $resultcomment = $stmtcomment->get_result();

            if ($resultcomment->num_rows > 0) {

                $statusFavorit = array("statuscomment" => "ada");
                array_push($comment, $statusFavorit);

                while ($rowcomment = mysqli_fetch_assoc($resultcomment)) {
                    array_push($comment, $rowcomment);
                }
            } else {
                $statusFavorit = array("statuscomment" => "tidakada");
                array_push($comment, $statusFavorit);
            }

            $data["comment"] = $comment;

            $arr = ["result" => "success", "data" => $data];
        }
        
    } 
    else{
        $arr = ["result" => "failed", "message" => "sql error: $sql"];
    }
    //jika komik belum pernah ada rating
    // else {

    //     $sql2 = "SELECT * FROM comics 
    //                 INNER JOIN 
    //                     comic_genres ON comics.id=comic_genres.comic_id 
    //                 INNER JOIN 
    //                     genres ON comic_genres.genres_id=genres.id 
    //                 WHERE 
    //                     comics.id='$id'";


    //     $stmt2 = $connection->prepare($sql2);
    //     $stmt2->execute();
    //     $result2 = $stmt2->get_result();


    //     if ($result2->num_rows > 0) {
    //         $data = [];
    //         // $rate = [];
    //         $rate = array("rate"=>0);

    //         //baca data perbaris
    //         while ($row2 = mysqli_fetch_assoc($result2)) {

    //             $row2+= $rate;
    //             //insert data ke array
    //             array_push($data, $row2);

    //         }

    //         // $data["rate"] = $rate;

    //         $arr = ["result" => "success", "data" => $data];
    //     } 
    //     else {
    //         $arr = ["result" => "failed", "message" => "sql error: $sql"];
    //     }
    // }

    echo json_encode($arr);
    $stmt->close();
    $connection->close();
}
