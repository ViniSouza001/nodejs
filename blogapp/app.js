// carregando módulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const admin = require('./routes/admin')
    // const mongoose = require('mongoose');
    const app = express();
    const path = require('path');

// configurações
    // body parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    // Mongoose
        // em breve...
    // Public
        app.use(express.static(path.join(__dirname, "public")))
// Rotas
    app.use('/admin', admin);
// Outros
const PORT = 8081;
app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
})