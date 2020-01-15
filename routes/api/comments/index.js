/*******************************************************************************
  ~/api/comments router
*******************************************************************************/

/// tools ///
const express = require ('express')
const db = require ('../../../data/db')

/***************************************
  setup router
***************************************/

const router = express.Router ()
const hello = {
  message : `hello! i'm ~/api/comments.`,
}

/***************************************
  handle requests
***************************************/

/*******************
  /
*******************/

router.get ('/', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})

/*******************
  /:id
*******************/

router.get ('/:id', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})

router.put ('/:id', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})

router.delete ('/:id', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})

/**************************************/

/// exports ///
module.exports = router
