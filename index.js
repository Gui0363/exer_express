const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioApi = require('./api/usuario')
require('./api/produto')(app, 'com param!')

app.post('/usuario', usuarioApi.salvar)
app.get('/usuario', usuarioApi.obter)

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(saudacao('Gui'))

app.use((req, res, next) => {
  console.log('Sera que serei chamado?')
  next()
})

app.get('/clientes/relatorio', (req, res) => {
  res.send(
    `Cliente relatório: completo = ${req.query.completo} ano = ${req.query.ano}`
  )
})

app.post('/corpo', (req, res) => {
  /*
    let corpo = ''
  req.on('data', function(parte) {
    corpo += parte
  })

  req.on('end', function() {
    res.send(corpo)
  })
  */
  res.send(req.body)
})

app.get('/clientes/:id', (req, res) => {
  res.send(`Cliente ${req.params.id} selecionado`)
})

app.get('/opa', (req, res, next) => {
  console.log('Durante...')
  res.json([
    {
      id: 7,
      name: 'Pablo',
      position: 1,
    },
    {
      id: 70,
      name: 'Paola',
      position: 2,
    },
    {
      id: 47,
      name: 'Patolino',
      position: 3,
    },
  ])

  /*
    res.json({
    name: 'iPad 32Gb',
    price: 1899.0,
    discount: 0.12,
  })

  */
  next()
})

app.use((req, res) => {
  console.log('Depois...')
})

app.listen(3000, () => {
  console.log('Backend Executando')
})
