const Sequelize = require('sequelize');
const sequelize = new Sequelize('teste', 'root', '#Mgccube593722', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}