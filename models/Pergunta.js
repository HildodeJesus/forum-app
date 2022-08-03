const Sequelize = require('sequelize')
const connection = require('../db/db')

const Pergunta = connection.define('pergunta', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({force: false}).then(() => {})

module.exports = Pergunta