/// tools ///
const _ = require ('lodash/fp')
const express = require ('express')
const logger = require ('morgan')

/***************************************
  setup server
***************************************/

const port = 5555
const server = express ()
server.use (express.json ())
server.use (logger ('dev'))

/***************************************
  setup children
***************************************/

server.use (require ('./routes'))

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})

/**************************************/
