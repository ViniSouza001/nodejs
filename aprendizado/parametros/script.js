var express = require('express')
const app = express()

app.get('/', function(req, res){
	res.send('Main page')
})

app.get('/about', function(req, res){
	res.send('About me')
})

app.get('/blog', function(req, res){
	res.send('welcome to my blog')
})

app.get('/ola/:nome/:cargo/:color', function(req, res){
	res.send("<h1>Ola " + req.params.nome+"</h1>" + "<h2>Seu cargo e: "+req.params.cargo + "</h2>" + "<h3>Your favorite color is: " + req.params.color + "</h3>")
})

app.listen(8081, function() {
	console.log('server initialized')
})