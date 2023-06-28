const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Categoria') // model de categoria
const Categoria = mongoose.model('categorias')
require('../models/Postagens') // model de postagens
const Postagem = mongoose.model('postagens')

/** res.render: irá renderizar algum arquivo, então a construção dele é
 *  res.render('(nome da pasta)/caminho/do/arquivo')
 *  render não precisa de '/' antes de tudo
 * 
 *  res.redirect: irá jogar o usuário para outra página, então a construção fica
 *  res.redirect('/(rota admin)/caminho/da/pagina')
 *  redirect precisa de uma '/' antes de tudo
 */


router.get('/', (req, res) => {
    // o res.render já entende automaticamente que ele irá renderizar algum elemento na pasta 'views'
    res.render("admin/index")
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
    Categoria.deleteOne({ _id: req.body.id }).then(() => {
        req.flash("success_msg", "Category deleted successfully")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "There was an error deleting the category")
        res.redirect("/admin/categorias")
    })

})

router.get("/postagens", (req, res) => {
    Postagem.find().lean().populate("categoria").sort({ data: 'desc' }).then((postagens) => {
        res.render("admin/postagens", { postagens: postagens })
    }).catch((err) => {
        req.flash("error_msg", "There was an error listing posts")
        res.redirect('/admin')
    })
})

router.get('/postagens/add', (req, res) => {
    // ele irá pesquisar todas as categorias criadas pelo usuário para mostrar
    Categoria.find().lean().then(categorias => {
        res.render("admin/addPostagem", { categorias: categorias })
    }).catch(err => {
        req.flash("error_msg", "There was an error loading the form")
        res.redirect('/admin')
    })
})

router.post("/postagens/nova", (req, res) => {
    var erros = []

    if (req.body.categoria == 0) {
        erros.push({ texto: "Invalid category! Please, register a category" })
    }

    if (erros.length > 0) {
        res.render('admin/addPostagem', { erros: erros })
    } else {
        const { titulo, descricao, conteudo, categoria, slug } = req.body
        const novaPostagem = {
            titulo: titulo,
            descricao: descricao,
            conteudo: conteudo,
            categoria: categoria,
            slug: slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Post created successfully")
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash("error_msg", "There was an error creating the post")
            res.redirect('/admin/postagens')
        })
    }
})

router.get("/postagens/edit/:id", (req, res) => {

    // fazendo duas pesquisas: uma das postagens...
    Postagem.findOne({ _id: req.params.id }).lean().then(postagem => {

        // e quando ele achar, irá pesquisar as categorias criadas pelo usuário
        Categoria.find().lean().then(categorias => {

            // só assim ele irá renderizar a página de formulário de alteração com os dados
            res.render('admin/editPostagens', { postagem: postagem, categorias: categorias })
        }).catch(err => {
            req.flash("error_msg", "There was an error listing categories")
            res.redirect("/admin/postagens")
        })

    }).catch(err => {
        req.flash('error_msg', "This post doesn't exist!")
        res.redirect("/admin/postagens")
    })
})

router.post("/postagem/edit", (req, res) => {
    Postagem.findOne({ _id: req.body.id }).then((postagem) => {
        console.log(postagem)

        // const { titulo, descricao, conteudo, categoria, slug } = req.body.
        postagem.titulo = req.body.titulo
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria
        postagem.slug = req.body.slug

        postagem.save().then(() => {
            req.flash("success_msg", "Post updated successfully")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "There was an error saving the post")
            res.redirect("/admin/postagens")
        })

    }).catch(err => {
        console.log(err);
        req.flash("error_msg", "There was an error updating the post!")
        res.redirect("/admin/postagens")
    })
})

// não recomendável, pois é uma rota tipo GET
router.get("/postagens/deletar/:id", (req, res) => {
    Postagem.findByIdAndDelete({_id: req.params.id}).lean().then(() => {
        req.flash("success_msg", "Post deleted successfully")
        res.redirect('/admin/postagens')
    }).catch(err => {
        req.flash("error_msg", "There was an internal error to delete the post")
        res.redirect("/admin/postagens")
    })
})

module.exports = router;