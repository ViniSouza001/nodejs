const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render("admin/index")
});

router.get('/posts', (req, res) => {
    res.send('Página de posts');
});

router.get('/categorias', (req, res) => {
    res.render('admin/categorias');
});

router.get('/categorias/add', (req, res) => {
    Categoria.find().then(categorias => {
        res.render('admin/addcategorias', {categorias: categorias})
    }).catch(err => {
        req.flash("error_msg", "There was an error listing the categories")
        res.redirect('/admin')
    })
})

router.post("/categorias/nova", (req, res) => {
    
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Slug inválido"})
    }

    if(req.body.nome.length < 2) {
        erros.push({texto: "Nome da categoria pequeno demais"})
    }

    if(erros.length > 0) {
        res.render("admin/addcategorias.handlebars", {erros: erros})
    } else {
        const NovaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(NovaCategoria).save().then(() => {
            // pega a variável global e adiciona uma frase de sucesso
            req.flash("success_msg", "Category created successfully")
           res.redirect("/admin/categorias")
        }).catch((err) => {
            // pega a variável global e adiciona uma frase de erro
            req.flash("error_msg", "Couldn't create the category, try again!")
        })
    }
    
    
    
})

module.exports = router;