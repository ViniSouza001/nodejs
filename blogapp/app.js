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
// Outros
const PORT = 8081;
app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})