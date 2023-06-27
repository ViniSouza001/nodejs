const mongoose = require('mongoose')
const Schema = mongoose.Schema // questão de ser mais prático
/**
 * melhor digitar:
 * new Schema()...
 * do que:
 * new mongoose.Schema()...
 */

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria)