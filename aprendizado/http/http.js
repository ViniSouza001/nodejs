// manual way to create a local server
var http = require('http')
http.createServer(function(req, res) {
    res.end('hello world! Welcome to my website')
}).listen(8081)
console.log('O servidor está rodando!')