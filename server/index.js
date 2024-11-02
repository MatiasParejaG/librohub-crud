const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"libros_crud"
});

app.post("/create",(req,res)=>{
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const anio = req.body.anio;
    const genero = req.body.genero;
    const precio = req.body.precio;
    const stock = req.body.stock;

    db.query('INSERT INTO libros (titulo, autor, anio, genero, precio, stock) VALUES (?,?,?,?,?,?)',[titulo,autor,anio,genero,precio,stock],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.get("/libros",(req,res)=>{

    db.query('SELECT * FROM libros',
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const anio = req.body.anio;
    const genero = req.body.genero;
    const precio = req.body.precio;
    const stock = req.body.stock;

    db.query('UPDATE libros SET titulo=?, autor=?, anio=?, genero=?, precio=?, stock=? WHERE id=?',[titulo,autor,anio,genero,precio,stock,id],
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM libros WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})