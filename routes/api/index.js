/*******************************************************************************
  ~/api router
*******************************************************************************/

/// tools ///
const express = require ('express')

/***************************************
  setup router
***************************************/

const router = express.Router ()

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
    .status (200)
    .json ({
      message : `hello! i'm ~/api.`,
    })
})

/**************************************/

/// exports ///
module.exports = router
