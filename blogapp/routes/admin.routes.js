const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    // o res.render já entende automaticamente que ele irá renderizar algum elemento na pasta 'views'
    res.render("admin/index")
});

router.get('/posts', (req, res) => {
    res.send('Página de posts');
});

router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
        res.render('admin/categorias', { categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug inválido" })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria pequeno demais" })
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias.handlebars", { erros: erros })
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

router.post("/categorias/edit", (req, res) => {

    var erros = []

    Categoria.findOne({ _id: req.body.id }).then((categoria) => {
        const { nome, slug } = req.body
        if (!nome || typeof nome == undefined || nome == undefined) {
            erros.push({ texto: "The category and slug must have a name" })
        }

        if (nome.length <= 1) {
            erros.push({ texto: "Category name too short" })
        }

        if (!slug || typeof slug == undefined || slug == undefined) {
            erros.push({ texto: "The category and slug must have a name" })
        }

        if (slug.length <= 1) {
            erros.push({ texto: "Slug name too short" })
        }

        if (erros.length > 0) {
            const mensagensErro = erros.map(erro => erro.texto).join('\n')
            req.flash("error_msg", mensagensErro)
            return res.redirect("/admin/categorias")
        } else {
            categoria.nome = nome
            categoria.slug = slug

            categoria.save().then(() => {
                req.flash("success_msg", "Category updated successfully")
                res.redirect("/admin/categorias")
            }).catch(err => {
                req.flash("error_msg", "There was an internal error updating the category")
                res.redirect("/admin/categorias")
            }).catch(err => {
                req.flash("error_msg", "There was an error editing the category")
                res.redirect("/admin/categorias")

            })


        }
    })
})

router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render('admin/editCategorias.handlebars', { categoria: categoria })
    }).catch((err) => {
        req.flash("error_msg", "This category doesn't exist")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/deletar", (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Category deleted successfully")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "There was an error deleting the category")
        res.redirect("/admin/categorias")
    })

})

router.get("/postagens", (req, res) => {
    res.render("admin/postagens")
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().lean().then(categorias => {
        res.render("admin/addPostagem", {categorias: categorias})
    }).catch(err => {
        req.flash("error_msg", "There was an error loading the form")
        res.redirect('/admin')
    })
})

module.exports = router;