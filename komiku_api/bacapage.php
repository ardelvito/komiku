<?php
    //agar bisa diakses oleh semua device
    header("Access-Control-Allow-Origin: *");
    
    $arr = null;
    $connection = new mysqli("localhost", "hybrid_160420030", "ubaya", "hybrid_160420030");

    if($connection->connect_error){
        $arr = ["result" => "error", "message" => "unable to connect to server"];
    }
    else{

        if(isset($_POST['id'])) {
            $id = $_POST['id'];
            $sql = "SELECT 
                        * 
                    FROM 
                        pages 
                    INNER JOIN 
                        comics 
                    ON 
                        pages.comics_id = comics.id
                    WHERE 
                        pages.comics_id ='$id'";
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
