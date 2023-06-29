// carregando módulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const admin = require('./routes/admin.routes.js')
    const mongoose = require('mongoose')
    const app = express();
    const path = require('path');
    const session = require('express-session')
    const flash = require('connect-flash')
    require("./models/Postagens.js")
    const Postagem = mongoose.model("postagens")

// configurações
    // sessão
        app.use(session({
            secret: "cursoNode",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            // esse middleware irá criar duas variáveis globais: uma para mensagem de sucesso e outra para erro
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    // body parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise
        mongoose.connect('mongodb://0.0.0.0:/blogapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('connected to MongoDB');
        }).catch((err) => {
            console.log('error to connect to MongoDB: ' + err)
        })
    // Public
        app.use(express.static(path.join(__dirname, "public")))

// Rotas
    app.use('/admin', admin);

    app.get('/', (req, res) => {
        Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch(err => {
            req.flash("error_msg", "There was an internal error")
            res.redirect("/404")
        })
    })

    app.get("/404", (req, res) => {
        res.send("Página não encontrada")
    })

    app.get("/postagens/:slug", (req, res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if(postagem) {
                res.render("posts/index", {postagem: postagem})
            } else {
                req.flash("error_msg", "This post doesn't exist")
                res.redirect("/")
            }
        }).catch(err => {
            req.flash("error_msg", "There was an internal error")
            res.redirect("/")
        })
    })
// Outros
const PORT = 8081;
app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})