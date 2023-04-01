const express = require('express');
const app = express();

app.get("/", function(req,res) {
	res.send("Seja bem vindo ao meu app!");
})

app.get("/sobre", function(req, res){
	res.send("My page sobre");
})

app.get("/blog", function(req, res){
	res.send("Welcome to my blog!!")
})


app.listen(8081, function() {
    console.log("Servidor rodando na URL HTTPS://localhost:8081");
	})