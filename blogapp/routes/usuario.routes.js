const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario.js")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require('passport')

router.get("/registro", (req, res) => {
    res.render("users/registro")
})

router.post("/registro", (req, res) => {
    const { nome, email, senha, senha2 } = req.body
    var erros = []

    if(!nome || typeof nome == undefined || nome == null) {
        erros.push({texto: "Invalid name"})
    }

    if(!email || typeof email == undefined || email == null) {
        erros.push({texto: "Invalid E-mail"})
    }

    if(!senha || typeof senha == undefined || senha == null) {
        erros.push({texto: "Invalid password"})
    }

    if(senha.length < 4) {
        erros.push({texto: "Password too short"})
    }

    if(senha != senha2) {
        erros.push({texto: "Passwords do not match"})
    }

    if(erros.length > 0) {
        res.render("users/registro", {erros: erros})
    } else {
        Usuario.findOne({email: email}).lean().then(usuario => {
            if(usuario) {
                // já existe um usuário com email cadastrado
                req.flash("error_msg", "An account with this email already exists in out system")
                res.redirect("/usuarios/registro")
            } else { 
                // não existe um usuario com o email cadastrado

                if(email == "viniciusvieira130705@gmail.com" || email == "viniciussouza130705@gmail.com") {
                    const novoUsuario = new Usuario({
                        nome: nome,
                        email: email,
                        senha: senha,
                        admin: 1
                    })
    
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro) {
                                req.flash("error_msg", "There was an error to save the user")
                                res.redirect("/")
                            }
    
                            novoUsuario.senha = hash
    
                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "User created successfully")
                                res.redirect("/")
                            }).catch(err => {
                                res.flash("error_msg", "There was an internal error to create the user, try again")
                                res.redirect("/usuarios/registro")
                            })
                        })
                    })
                } else {
                    const novoUsuario = new Usuario({
                        nome: nome,
                        email: email,
                        senha: senha
                    })
    
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                            if(erro) {
                                req.flash("error_msg", "There was an error to save the user")
                                res.redirect("/")
                            }
    
                            novoUsuario.senha = hash
    
                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "User created successfully")
                                res.redirect("/")
                            }).catch(err => {
                                res.flash("error_msg", "There was an internal error to create the user, try again")
                                res.redirect("/usuarios/registro")
                            })
                        })
                    })
                }

            }
        }).catch(err => {
            req.flash("error_msg", "There was an internal error")
        })
    }
})

router.get("/login", (req, res) => {
    res.render("users/login")
})

router.post("/login", (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

module.exports = router