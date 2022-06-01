var headers = {"Access-Control-Allow-Origin": null, "Content-Type": "image/jpg"};
var server = "https://reservapi.azurewebsites.net"
var url = `${server}/peliculas`;
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
    for (var i=0; i<pelicula.length;i++){
        body.innerHTML += `
        <div class="containerData">
        <div class="poster">
            <img src=${pelicula[i].poster} alt="Poster" style="width:300px;height:350px;">
        </div>
        <div class="info">
        <h2>${pelicula[i].titulo}</h2>
        <h3>Sinopsis</h3>
        <h4>${pelicula[i].sinopsis}</h4>
        <h5>Duración: ${pelicula[i].duracion}</h5>
        <p>Asientos disponibles: ${pelicula[i].asientos}</p>
        </div>
        <br>
        <button class="btn-primary" onclick="window.location.href = 'reservar.html?titulo=${pelicula[i].titulo}'">Reservar boletos</button>
        <br>
        </div>`;
    }
}