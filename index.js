const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const connection = require('./db/db')
const Pergunta = require('./models/Pergunta')
const Resposta = require('./models/Resposta')

connection.authenticate().then(() => console.log('Conexão feita com o banco de dados!')).catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {

  Pergunta.findAll({raw: true, order: [['createdAt', 'DESC']]}).then(perguntas => {
    res.render('index', {
      perguntas
    })
  })
  
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
  let title = req.body.title 
  let desc = req.body.desc 
  Pergunta.create({
    title,
    desc
  }).then(() => {
    res.redirect('/')
  })
})

app.get('/pergunta/:id', (req, res) => {
  Pergunta.findOne({where: {id: req.params.id}}).then(pergunta => {
    if(pergunta != undefined) {
      Resposta.findAll({where: {perguntaId: pergunta.id}, order: [['createdAt', 'DESC']]}).then(respostas => {
        res.render('pergunta', {pergunta, respostas})
      })
      
    } else {
      res.redirect('/')
    }
  })
})

app.post('/responder', (req, res) => {
  const resposta = {
    corpo: req.body.corpo,
    perguntaId: req.body.perguntaId
  }
  Resposta.create(resposta).then(() => {
    res.redirect(`/pergunta/${resposta.perguntaId}`)
  })
})

app.listen(8080, console.log('Serve listening at port 8080'))
