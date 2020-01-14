/// tools ///
const _ = require ('lodash/fp')
const express = require ('express')
const logger = require ('morgan')

/// server ///
const port = 5555
const server = express ()
server.use (express.json ())
server.use (logger ('tiny'))

// /// database ///
// const db = require ('./data/db.js')

/// routers ///
const useRoutes = require ('./routes/useRoutes')

/***************************************
  routing
***************************************/

useRoutes (server, [ '', '/api' ], './routes')

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
