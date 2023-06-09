const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true        
    }
})

mongoose.model("usuarios", usuario)