<?php
    //agar bisa diakses oleh semua device
    header("Access-Control-Allow-Origin: *");
    
    $arr = null;
    $connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

    if($connection->connect_error){
        $arr = ["result" => "error", "message" => "unable to connect to server"];
    }
    else{

        if(isset($_POST['id']) && isset($_POST['email'])) {
            $id = $_POST['id'];
            $sql = "SELECT 
                        *
                    FROM 
                        comics 
                    INNER JOIN 
                        comic_genres ON comics.id=comic_genres.comic_id 
                    INNER JOIN 
                        genres ON comic_genres.genres_id=genres.id 
                    WHERE 
                        genres.id='$id'";
        }
        else if(isset($_POST['cari'])){
            $cari = $_POST['cari'];
            $sql = "SELECT * FROM comics WHERE comics.title LIKE '%$cari%'";
            
        }
        else{
        $sql = "SELECT 
                        comics.id AS comic_id, comics.title, comics.author, comics.total_view, comics.sinopsis, 
                        comics.release_date, comics.url_poster 
                    FROM 
                        comics;";
        }

        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            $data = [];
            //baca data perbaris
            while($row = mysqli_fetch_assoc($result)) {
                
                array_push($data, $row);
            }   
            $arr = ["result" => "success", "data" => $data];
        }
        else{
            $arr = ["result" => "failed", "message" => "sql error: $sql"];
        }

        echo json_encode($arr);
        $stmt->close(); 
        $connection->close();
    }
?>