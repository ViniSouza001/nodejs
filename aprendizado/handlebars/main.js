const express = require('express');
const app = express();
const posts = require('./views/modals/posts');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

// config
    // template engine
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    // body parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
// rotas
app.get('/', function(req, res){
    res.render('principal');
});

app.get('/envio', function(req, res){
    posts.findAll({order: [['id', 'desc']]}).then(function(posts){
        res.render('envio', {posts: posts});
    });
});

app.get('/delete/:id', function(req, res){
    posts.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Post deletado com sucesso!');
    }).catch(function(error){
        res.send('Este post não existe');
    });
});

//envio do forumlario
app.post('/formulario', function(req, res){
    posts.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/envio');
    }).catch(function(error){
        res.send(`Não foi possível criar a publicação: ${error}`);
    });
});


app.listen('8080', function(){
    console.log('server running');
});