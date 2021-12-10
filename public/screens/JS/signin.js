function init(){
    document.querySelector('.btn-primary').addEventListener("click",signin);
}

function signin(){
    var nombre = document.getElementById('nombres').value
    var apellidos = document.getElementById('apellidos').value
    var usuario = document.getElementById('usuario').value
    var contrasenia = document.getElementById('contrasenia').value
    var dia = parseInt(document.getElementById('dia').value)
    var mes = parseInt(document.getElementById('mes').value)
    var anio = parseInt(document.getElementById('anio').value)
    var fechaNac = dia+"/"+mes+"/"+anio

    axios({
        //headers: {"Access-Control-Allow-Request": null, 'Content-Type': 'application/json'},
        method: 'post',
        url:'https://reserv-api.herokuapp.com/signin',
        data:{
            nombre: nombre,
            apellidos: apellidos,
            usuario: usuario,
            contrasenia: contrasenia,
            fechaNac: fechaNac
        },
    }).then(function(res){
        alert("Registrado")
        window.location.href="login.html"
    }).catch(function(err){
        console.log("AAAAAAAAA", err)
        alert("Error")
    })
}