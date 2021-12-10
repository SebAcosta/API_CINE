var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var titulo = urlParams.get('titulo');
var url = 'https://reserv-api.herokuapp.com/reservar'

function init(){
    var body = document.querySelector("body");
    body.innerHTML += `
    <div class="containerData">
    <h1>${titulo}</h1>
    <h2>Añade tus boletos</h2>
    <p>Adultos:</p>
    <input class="input" id="Adultos" type="number" min="0">
    <br>
    <p>Niños:</p>
    <input class="input" id="Ninios" type="number" min="0">
    <br>
    <p>3ra edad:</p>
    <input class="input" id="Tercera" type="number" min="0">
    <button class="btn-primary">Reservar</button>
    </div>`;
    document.querySelector('.btn-primary').addEventListener("click",reservar);
}

function reservar(){
    var adultos = parseInt(document.getElementById('Adultos').value) || 0
    var niños = parseInt(document.getElementById('Ninios').value) || 0
    var tercera = parseInt(document.getElementById('Tercera').value) ||0 
    if (adultos == null){
        adultos == 0
    }
    if (niños == null){
        niños == 0
    }
    if (tercera == null){
        tercera == 0
    }
    var total = adultos+niños+tercera

    axios({
        //headers: {"Access-Control-Allow-Request": null, 'Content-Type': 'application/json'},
        method: 'patch',
        url: url,
        data:{
            total : total,
            titulo: titulo
        },
    }).then(function(res){
        if (res.data.code === 200){
            alert("Se reservaron " + total + " boletos")
            window.location.href = 'confirmado.html'
            console.log(res);
        }else{
            alert("Ocurrió un error")
        }
    }).catch(function(err){
        console.log("AAAAAAAAA", err)
        alert("Ocurrió un error")
    })
}