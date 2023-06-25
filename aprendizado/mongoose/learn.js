const mongoose = require('mongoose');

// Config mongoDB
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://0.0.0.0:/aprendendo', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=> {
        console.log('MongoDB conected...') // successfully
    }).catch((err)=> {
        console.log('Error to connect: ' + err) // error
    });

    // OBS
        /* 
        POR MOTIVOS DE ERRO, TIVE DE COLOCAR A URL DO MONGODB PARA "0.0.0.0"
        CASO CONTRÁRIO, ELE NÃO FUNCIONOU 
        */

// Model - usuários
// Definindo um model
const UsuarioSchema = mongoose.Schema({

    nome: {
        type: String,
        require: true        
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

// Ligando a collection
    mongoose.model('usuarios', UsuarioSchema);

// criando um novo documento
const Usuario = mongoose.model('usuarios');

new Usuario({
    nome: "Vinicius",
    sobrenome: "Souza",
    idade: 17,
    email: "vinisouza01@gmail.com",
    pais: "Brasil"
}).save().then(() => {
    console.log('User created successfully');
}).catch((err) => {
    console.log('Error to create new user: ' + err);
});