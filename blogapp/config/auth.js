// arquivo para configurar todo o sistema de autenticação

const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// model de usuarios
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function (passport) {

    // qual o campo quereremos analisar? No caso é o email
    passport.use(new localStrategy({ usernameField: "email", passwordField: "senha" }, (email, senha, done) => {
        Usuario.findOne({ email: email }).then(usuario => {
            if (!usuario) {
                // parâmetro 1: (dados da conta autenticada, que no caso nesse 'if', nenhuma conta foi encontrada, então é 'null')
                // parâmetro 2: (se a autenticação foi um sucesso ou não, no caso se entrar nesse 'if', não foi um sucesso, então é 'false')
                // parâmtero 3: (a mensagem de callback)
                return done(null, false, { message: "This account doesn't exist" })
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {

                if (batem) { // se as senhas batem
                    return done(null, usuario)
                } else { // se não...
                    return done(null, false, { message: "Incorrect password" })
                }
            })
        })
    }))

    // salvar os dados do usuário em uma sessão
    passport.serializeUser((usuario, done) => {

        done(null, usuario.id)

    })


    passport.deserializeUser((id, done) => {

        Usuario.findById(id)
            .then(usuario => {
                done(null, usuario)
            }).catch(err => done(err))
    })

}