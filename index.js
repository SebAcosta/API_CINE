const express = require("express");
const sqlite3 = require("sqlite3");
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');

const app = express();
app.use(express.json())
app.use(express.static(__dirname ));
app.use(bodyParser.json())

const db2 = new sqlite3.Database("./Usuarios.db",(err)=>{
    if(err){
        console.log('No se puede conectar a la base de datos 2');
    }else{
        console.log('Conectado a la base de datos 2');
    }
});

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '2E9S1a#12019',
    database: 'api'
});

connection.connect(error =>{
    if (error){
        console.log("No se pudo conectar a la BD api", error)
    }else{
        console.log("Conectado a BD api")
    }
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "content-type,x-requested-with,Authorization, x-ui-request,lang");
    next();
  });

app.post('/login', async(req,res)=>{
    const {usuario, contrasenia} = req.body;
    var sql = `select * from Usuarios where usuario = '${usuario}' AND contrasenia = '${contrasenia}';`;
    const rows = connection.query(sql);

    if(rows){
        return res.status(200).json({code:200});
    }
    res.status(500).json({code: 500})
    return
})

app.post('/signin',async(req,res)=>{
    const {nombre, apellidos, usuario, contrasenia, fechaNac} = req.body;
    var sql = "insert into Usuarios (nombre, apellidos, usuario, contrasenia, fechaNac) "
    sql += `values ('${nombre}', '${apellidos}', '${usuario}', '${contrasenia}', '${fechaNac}');`;
    const rows = await connection.query(sql);

    if(rows){
        return res.status(201).json({code:201})
    }
    res.status(500).json({code: 500})
    console.log("No se insertó")
    return
})

app.get('/peliculas', (req,res)=>{
    const sql = `select * from Peliculas;`;

    connection.query(sql,(err, rows)=>{
        if(err){
            throw err;
        }
        res.json({rows})
        
    })
})

app.get('/peliculas/:titulo', function(req,res){
    const {titulo} = req.params;
    const sql = `select * from Peliculas where titulo = '${titulo}';`;

    connection.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }
        res.json({rows})
    })
})

app.patch('/reservar', function(req,res){
    const {total, titulo} = req.body;
    const sql = `update Peliculas set asientos = asientos - '${total}' where titulo = '${titulo}';`;

    connection.query(sql,(err,rows)=>{
        if(err){
            res.status(400).json({code:400})
            return
        }
        res.status(200).json({code:200})
    })
    /*db2.run('update Peliculas set asientos = asientos - ? where titulo = ?',[req.body.total, req.body.titulo],(err,rows)=>{
        if(err){
            res.status(400).json({"error":err.message})
            return
        }
        res.status(200).json({code:200})
    })*/
})

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(PORT, () =>{
    console.log("Servidor a la espera de peticiones en el puerto 5000");
});