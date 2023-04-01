const db = require('./db');
const posts = db.sequelize.define('posts', {
    titulo: {
        type: db.Sequelize.STRING(50)
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

module.exports = posts;