const Sequelize = require('sequelize') // o sequelize interliga o node com o mysql
const sequelize = new Sequelize('teste', 'root', '#Mgccube593722', { // criamos uma variável para o sequelize
    host: "localhost",
    dialect: 'mysql'
})

// criar um model de postagens (blogs) e users
const Postagem = sequelize.define('postagens', { // cria uma tabela no bd
    titulo: { // cria um elemento chamado 'titulo'
        type: Sequelize.STRING
    },
    conteudo: { // cria um elemento chamado 'conteudo'
        type: Sequelize.TEXT
    }
})

const Usuario = sequelize.define('usuarios', { // cria uma segunda tabela no bd
    nome: { // cria um elemento
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

// criação de dados para o bd (banco de dados)
Postagem.create({
    titulo: "APENAS UM SHOW",
    conteudo: "Eu sou um sigma"
})

Usuario.create({
    nome: "Vinicius",
    sobrenome: "Souza",
    idade: 17,
    email: "viniciusvieira130705@gmail.com"
})