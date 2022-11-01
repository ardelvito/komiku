
var $$ = Dom7;

var device = Framework7.getDevice();

//DAFTAR KOMIK
function getComics(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/daftarkomik.php",
    { 
      "id": vid,
      "email": vemail
    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      

      // console.log(comics_api[0]['title']);
      console.log(comics_api[0]['comic_id']);
      console.log(comics_api[0]['title']);
      console.log(localStorage.username);
      console.log(localStorage.email);


      for (var i = 0; i<comics_api.length; i++) {
        $$("#daftarkomik").append(
          "<div class='col-50'>" + 
          "<div class='card'> " + 
          "<div class='card-content'> <img src='"+ comics_api[i]['url_poster'] +
          "' width='100%'> </div> " +                                
          "<div class='card-footer'><a href='/bacakomik/"+ comics_api[i]['comic_id'] +"'class='button button-fill' " + 
          "style='width: 340px;height: 30px';>" + "LIHAT</a> </div></div></div>");

      }

    }
  )
}

//GET PAGE
function getPage(vid) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/bacapage.php",
    { 
      "id": vid
    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      

      // // console.log(comics_api[0]['title']);
      // console.log(comics_api[0]['comic_id']);
      // console.log(comics_api[0]['title']);
      // console.log(localStorage.username);
      // console.log(localStorage.email);


      for (var i = 0; i<comics_api.length; i++) {
        $$("#bacapage").append(
          "<div class='col-250'>" + 
          "<div class='card'> " + 
          "<div class='card-content'> <img src='"+ comics_api[i]['img_url'] +
          "' width='100%'> </div>  </div></div>"
      );

      }
    }
  )
}

function addRating(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/addrating.php",
    { 
      "id": vid,
      "email": vemail,
      "rating": $$("#txtrating").val()
      
    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      var result = arr['result'];

      if(result == "successupdate"){
        console.log("Berhasil memperbaharui rating");
        app.dialog.alert('Berhasil memperbaharui rating');

      }
      else if(result == "successinsert"){
        console.log("Berhasil memberi rating");
        app.dialog.alert('Berhasil memberi rating');

      }
      else{
        console.log("error");
        app.dialog.alert('Terjadi error saat memberi rating');
      }
    }
  )
}


function addComment(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/addkomentar.php",
    { 
      "id": vid,
      "email": vemail,
      "comment": $$("#txtcomment").val()
      
    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      var result = arr['result'];
      console.log($$("#txtcomment").val());
      console.log(vemail);
      
      if(result == "success"){
        var comment =  $$("#txtcomment").val();
        console.log("berhasil comment");
        $$("#comment-container").append(
          "<div class='card-header'>"+ localStorage.username + " - " +  comics_api[0]['date'] + "</div>" +
          "<div class='card-content card-content-padding'>" + comment + "</div>" +
          "</div> </div>"
        );

      }
      else{
        console.log("gagal comment");
      }
    }
  )
}


function getFavoriteComics(vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/komikfavorit.php",
    { 
      "email": vemail
    },

    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      var result = arr['result'];

      if(result == "success"){
        console.log("test");
        for (var i = 0; i<comics_api.length; i++) {
          $$("#komikfavorit").append(
            "<div class='col-50'>" + 
            "<div class='card'> " + 
            "<div class='card-content'> <img src='"+ comics_api[i]['url_poster'] +
            "' width='100%'> </div> " +                                
            "<div class='card-footer'><a href='/bacapage/"+ comics_api[i]['comic_id'] +"'class='button button-fill' " + 
            "style='width: 340px;height: 30px';>" + "LIHAT</a> </div></div></div>");

        }
      }
      else if(result == "nodata"){
        $$("#komikfavorit").append(
            "<h2 style='text-align:center'>Anda belum memiliki komik favorit</h2>"+
            "<a href='/daftarkomik'class='button button-fill' " + 
            "style='width: 340px;height: 30px';>" + "Daftar Komik</a>"
            );
      }
    }
  )
}


//INSERT KOMIK
function addFavoriteComic(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/addfavoritecomic.php",
    { 
      "id": vid,
      "email": vemail
    },

    function (data) {
      var arr = JSON.parse(data);
      var result=arr['result'];

      if(result=='success')
      {
        app.dialog.alert('Berhasil Menambah ke Komik Favorit');
      }else{
        app.dialog.alert('Gagal Menambah ke Komik Favorit');
      } 

    }
  )
}

function deleteFavoriteComic(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/deletefavoritecomic.php",
    { 
      "id": vid,
      "email": vemail
    },

    function (data) {
      var arr = JSON.parse(data);
      var result=arr['result'];

      if(result=='success')
      {
        app.dialog.alert('Berhasil Hapus dari Komik Favorit');
        
      }else{
        app.dialog.alert('Gagal Hapus dari Komik Favorit');
      } 

    }
  )
}

//BACA KOMIK
function getDataComics(vid, vemail) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/bacakomik.php",
    { 
      "id": vid,
      "email": vemail

    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      console.log(comics_api.length);

      // console.log(comics_api[0]['title']);
      console.log(vid);
      console.log(comics_api['title']);

        $$("#bacakomik").append(
          "<div class='col-50'>" + 
          "<div class='card'> " + 
          "<div class='card-content'> <img src='"+ comics_api['url_poster'] +
          "' width='100%'> ");  
          
          if(comics_api[1]['statusfavorite'] == 'tidak'){
            $$(".card-content").append(
              "<button id='btnFavorite' onClick='addFavoriteComic(\"" + vid + "\", \"" + vemail + "\")' class='button button-fill color-orange center' style='text-align: center;'>Favorite</button>"
            );  
          }
          else if(comics_api[1]['statusfavorite'] == 'ya'){
            $$(".card-content").append(
              "<button id='btnUnFavorite' onClick='deleteFavoriteComic(\"" + vid + "\", \"" + vemail + "\")' class='button button-fill color-orange center' style='text-align: center;'>Unfavorite</button>"
            ); 
          }
          $$(".card-content").append(
              "<div style='inline-size: 320px;overflow-wrap: break-word;margin-left: 15px;margin-right: 20px; margin-top: 5px'>"+
              "Rate: "  + comics_api[0]['avg_rate'] + "<br>"+
              "Sinopsis: <br>"+
              comics_api['sinopsis']+ 
              "<br><br> Pengarang: <br>" + comics_api['author']+
              "<br><br> Tanggal Rilis: <br>" + comics_api['release_date']+
              "<br><br> Jumlah Pembaca: <br> " + comics_api['total_view'] + 
              "<br><br> Genre: <br> "
            );  

            // console.log(comics_api['genre'].length);
            // console.log(comics_api['genre'][0]['name']);


          for (var i = 0; i<comics_api['genre'].length; i++) {
            $$(".card-content").append(
              "<div style='inline-size: 320px;overflow-wrap: break-word;margin-left: 15px;margin-right: 20px; margin-top: 5px'>"+
                comics_api['genre'][i]['name'] + "</div>"
            );  
          }

            $$(".card-content").append(
              "</div> <div class='card-footer'><a href='/bacapage/"+ comics_api['id'] +"'class='button button-fill' " + 
            "style='width: 340px;height: 30px';>" + "BACA</a> </div></div>"
            );  


          if(comics_api['telahrating'][0]['statustelahrating']=="ada"){
            var valuerating = comics_api['telahrating'][1]['rate'];
            console.log("terdapat rating");
          }
          else{
            var valuerating = 0;
          }

            $$("#bacakomik").append(
            "<div class='card'>" + 
            "<div class='list no-hairlines-md'> <ul>" + 
            "<li class='item-content item-input'>"+
            "<div class='item-inner'>"+
            "<div class='item-input-wrap'>"+
            "<input type='text' id='txtrating' placeholder='Give a rating' value='" + valuerating + "'/>" +
            "<span class='input-clear-button'></span>" +
            "<button id='btnrating' onclick='addRating(\"" + vid + "\", \"" + vemail + "\")' class='button button-fill color-orange center' style='text-align: center;margin-bottom:10px;'>Rating</button>" +
            "</div></div></li></ul></div></div>"
          );  


          $$("#bacakomik").append(
            "<div class='card'>" + 
            "<div class='list no-hairlines-md'> <ul>" + 
            "<li class='item-content item-input'>"+
            "<div class='item-inner'>"+
            "<div class='item-input-wrap'>"+
            "<input type='text' id='txtcomment' placeholder='Write some comment' />" +
            "<span class='input-clear-button'></span>" +
            "<button id='btnComment' onclick='addComment(\"" + vid + "\", \"" + vemail + "\")' class='button button-fill color-orange center' style='text-align: center;margin-bottom:10px;'>Comment</button>" +
            "</div></div></li></ul></div></div>"
          );  


            console.log(comics_api['comment'][0]['statuscomment']);
            console.log(comics_api['comment'][0]['statuscomment'].length);
            console.log(comics_api['comment'].length);

            $$("#bacakomik").append(
              "<div class='card' id='comment-container'>" + 
              "<div class='block-title' style='padding-bottom: 20px;padding-top: 20px;'>Comments</div></div>"
            );

          if(comics_api['comment'][0]['statuscomment']=="ada"){
            console.log("terdapat komen");

            for(var i = 1; i<comics_api['comment'].length; i++) {
              $$("#comment-container").append(
                "<div class='card-header'>"+ comics_api['comment'][i]['username'] + " - " +  comics_api['comment'][i]['date'] + "</div>" +
                "<div class='card-content card-content-padding'>" + comics_api['comment'][i]['text'] + "</div>" +
                "</div> </div>"
              );
            }

          }
          else{
              $$("#comment-container").append(
                "<div class='card-content card-content-padding'> Belum ada komentar </div>"

              );
          }


    

              // "<div class='card-header'>John Doe</div>" +
              // "<div class='card-content card-content-padding'>Great comics.</div>");  
    }
  )
}

function searchComics(vcari) {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/daftarkomik.php", 
    { 
      "cari": vcari 
    },
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      // console.log(comics_api[0]['title']);
      for (var i = 0; i<comics_api.length; i++) {
        $$("#carikomikcontainer").append(
            "<div class='col-50'>" + 
            "<div class='card'> " + 
            "<div class='card-content'> <img src='"+ comics_api[i]['url_poster'] +
            "' width='100%'> </div> " +                                
            "<div class='card-footer'><a href='/bacapage/"+ comics_api[i]['comic_id'] +"'class='button button-fill' " + 
            "style='width: 340px;height: 30px';>" + "LIHAT</a> </div></div></div>");

      }

    }
  )
}

//menampilkan genre
function getGenre() {
  app.request.post(
    "https://ubaya.fun/hybrid/160420030/komiku_api/genrekomik.php",
    function (data) {
      var arr = JSON.parse(data);
      var comics_api = arr['data'];
      // console.log(comics_api[0]['title']);
      for (var i = 0; i<comics_api.length; i++) {
        $$("#genrekomik").append(
          "<ul> <li>" + 
          "<a href='/daftarkomik/" +  comics_api[i]['id']  + "' class='item-content'>" +
          "<div class='item-inner' style='padding-left: 10px';>" +
          "<div class='item-title'>" + comics_api[i]['name']  + "</div>" + 
          "</div> </a> </li> </ul>");
      }

    }
  )
}

// function getComment() {
//   app.request.post(
//     "https://ubaya.fun/hybrid/160420030/komiku_api/komentarkomik.php",
//     function (data) {
//       var arr = JSON.parse(data);
//       var comics_api = arr['data'];
//       // console.log(comics_api[0]['title']);
//       for (var i = 0; i<comics_api.length; i++) {
//         $$("#genrekomik").append(
//           "<ul> <li>" + 
//           "<a href='/daftarkomik/" +  comics_api[i]['id']  + "' class='item-content'>" +
//           "<div class='item-inner' style='padding-left: 10px';>" +
//           "<div class='item-title'>" + comics_api[i]['name']  + "</div>" + 
//           "</div> </a> </li> </ul>");
//       }

//     }
//   )
// }

var app = new Framework7({
  name: 'Komiku', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.myapp', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

$$(document).on("page:init", function (e, page) {

  $$(document).on("page:afterin", function (e, page) {
    if(!localStorage.username) {
      page.router.navigate('/login/');
    }
  });

    if(page.name=='login')
    {
      localStorage.removeItem("username");
      $$('#btnsignin').on('click', function() {
          console.log("test");
          app.request.post('https://ubaya.fun/hybrid/160420030/komiku_api/login.php?', 
          { "username":$$("#username").val(),
          "password":$$("#password").val() } , 
          function (data) {
            var arr = JSON.parse(data);
            var result=arr['result'];
            var comics_api=arr['data'];

            if(result=='success')
            {
              localStorage.username = $$("#username").val();
              localStorage.email = comics_api['email'];

              page.router.back('/'); 
            }else app.dialog.alert('Username atau Password Anda Salah!');
          });
        });
    }

    if(page.name=='daftarkomik')
    {
      var id = page.router.currentRoute.params.id;
      var email = localStorage.email;

      getComics(id, email);

    }

    if(page.name=='genrekomik')
    {
      getGenre();
    }

    if(page.name=='bacakomik')
    {
      var id = page.router.currentRoute.params.id;
      var email = localStorage.email;
      getDataComics(id, email);
      $$('#btnFavorite').on('click', function() {
        console.log("Berhasil menambahkan komik ini ke komik favorit anda");
        // addFavoriteComic(id, email);

      });

      $$('#btnUnFavorite').on('click', function() {
          console.log("Berhasil menghapus komik ini ke komik favorit anda");

      });

      $$('#btnComment').on('click', function() {
          console.log("Berhasil comment");

      });
    }

    if(page.name=='komikfavorit')
    {
      var email = localStorage.email;
      getFavoriteComics(email)

    }

    if(page.name=='carikomik')
    {
      searchComics()
      $$('#btncari').on('click', function () {
        $$("#carikomikcontainer").html(" ");
        searchComics($$('#txtcari').val());
      })
    }

    if(page.name=='bacapage')
    {
      var id = page.router.currentRoute.params.id;
      getPage(id)

    }

});