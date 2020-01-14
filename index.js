/// tools ///
const _ = require ('lodash')
const express = require ('express')

/// server ///
const port = 5555
const server = express ()
server.use (express.json ())

// /// database ///
// const db = require ('./data/db.js')

/// routes ///
const routes = {
  '/' : require ('./routes'),
  '/api' : require ('./routes/api')
}

/***************************************
  routing
***************************************/

server.use ('/', routes['/'])
server.use ('/api', routes['/api'])

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
