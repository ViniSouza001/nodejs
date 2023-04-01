const Sequelize = require('sequelize')
/* sintaxe:
    variavel = new Sequelize('nomeDoBancoDados', 'usuario', 'senha', {
        servidor: "no nosso caso, na própria máquina",
        linguagemUsada: 'mysql'
    })
*/
const sequelize = new Sequelize('teste', 'root', '#Mgccube593722', {
    host: "localhost",
    dialect: 'mysql'
})