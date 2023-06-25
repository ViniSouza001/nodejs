const mongoose = require('mongoose')

// configurando o mongoose
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb://0.0.0.0:/teste", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB conected...");
    }).catch((err) => {
        console.log("Error to conect: " + err)
    })

// Model: usuarios

// definindo model
    // por padrão, usamos o sufixo "Schema" sempre no final do model
    const UserSchema = mongoose.Schema({
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
            type: String,
            require: false
        }
    })

    /* obs: qualquer tipo de número no mongoDB, é colocado 'type: Number' | qualquer tipo de texto: 'type: String' */
    mongoose.model('Users', UserSchema)
    
// determinando a collection
    const User = mongoose.model('Users')
    new User({
        nome: 'Vinicius',
        sobrenome: 'Souza',
        email: 'viniciussouza130705@gmail.com',
        idade: 18,
        pais: 'Brasil'
    }).save().then(() => {
        console.log('User created successfully')
    }).catch((err) => {
        console.log("Couldn't create the user: "+ err)
    })