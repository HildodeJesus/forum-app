const Sequelize = require('sequelize')
const connection = require('../db/db')

const Resposta = connection.define('respostas', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull:false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Resposta.sync({force: false}).then(() => {})

module.exports = Resposta