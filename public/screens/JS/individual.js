var headers = {"Access-Control-Allow-Origin": null, "Content-Type": "image/jpg"};
var url = "http://localhost:5000/peliculas";
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var titulo = urlParams.get('titulo');

function loadPelicula(){
    axios.get(url + "/" + titulo, headers)
    .then(function(res){
        console.log(res);
        displayPelicula(res.data.rows);
    }).catch(function(err){
        console.log(err)
    })
}

function displayPelicula(pelicula){
    var body = document.querySelector("body");
    if (pelicula.length >0){
        for (var i=0; i<pelicula.length;i++){
            body.innerHTML += `
            <div class="containerPeli">
            <h2>${pelicula[i].titulo}</h2>
            <img src=${pelicula[i].poster} alt="Poster" style="width:250px;height:300px;">
            <br>
            <button class="btn-primary" onclick="window.location.href = 'details.html?titulo=${pelicula[i].titulo}'">Ver información</button>
            <br>
            </div>`
        }
    }else{
        body.innerHTML += `
        <div class="containerPeli">
        <h2>No se encontraron películas con ese nombre</h2>`
    }
}