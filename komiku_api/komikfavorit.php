<?php
    //agar bisa diakses oleh semua device
    header("Access-Control-Allow-Origin: *");
    
    $arr = null;
    $connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

    if($connection->connect_error){
        $arr = ["result" => "error", "message" => "unable to connect to server"];
    }
    else{

            if (isset($_POST['email'])) {
                $email = $_POST['email'];

                $sql = "SELECT 
                        user_favorite.user_email, user_favorite.comic_id, comics.url_poster, comics.title
                    FROM 
                        user_favorite 
                    INNER JOIN 
                        comics 
                    ON 
                        user_favorite.comic_id = comics.id
                    WHERE 
                        user_favorite.user_email = '$email'";

                $stmt = $connection->prepare($sql);
                $stmt->execute();
                $result = $stmt->get_result();

                $data = [];
                if ($result->num_rows > 0) {
                    //baca data perbaris
                    while ($row = mysqli_fetch_assoc($result)) {
                        $statuskomikfavorit = array("statuskomikfavorit" => "ada");
                        array_push($row, $statuskomikfavorit);
                        array_push($data, $row);

                    }

                    $arr = ["result" => "success", "data" => $data];
                }
                else{


                    $arr = ["result" => "nodata", "data" => $data];

                }
            }

        
        // $email = $_POST['email'];


        // $arr = ["result" => "success", "data" => $data];

        // $arr = ["result" => "failed", "message" => "sql error: $sql", "data" => $data];

        echo json_encode($arr);
        $stmt->close(); 
        $connection->close();
    }
?>