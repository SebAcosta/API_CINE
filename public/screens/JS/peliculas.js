var headers = {"Access-Control-Allow-Origin": null, "Content-Type": "image/jpg"};
var url = "http://localhost:5000";

function loadPeliculas(){
    axios.get(url + "/peliculas", headers)
    .then(function(res){
        displayPeliculas(res.data.rows);
    }).catch(function(err){
        console.log(err)
    })
}

function displayPeliculas(pelicula){
    var body = document.querySelector("body");
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
}
