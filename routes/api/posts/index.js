/*******************************************************************************
  ~/api/posts router
*******************************************************************************/

/// tools ///
const express = require ('express')
const db = require ('../../../data/db')

/***************************************
  setup router
***************************************/

const router = express.Router ()
const hello = {
  message : `hello! i'm ~/api/posts.`,
}

/***************************************
  handle requests
***************************************/

router.get ('/', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})
})

/**************************************/

/// exports ///
module.exports = router
