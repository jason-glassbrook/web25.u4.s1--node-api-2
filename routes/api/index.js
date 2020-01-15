/*******************************************************************************
  ~/api router
*******************************************************************************/

/// tools ///
const express = require ('express')

/***************************************
  setup router
***************************************/

const router = express.Router ()
const hello = {
  message : `hello! i'm ~/api.`,
}

/***************************************
  setup children
***************************************/

router.use ('/posts', require ('./posts'))
router.use ('/comments', require ('./comments'))

/***************************************
  handle requests
***************************************/

router.get ('/', (ri, ro) => {
  ro
    .status (501)
    .json (hello)
})

/**************************************/

/// exports ///
module.exports = router
