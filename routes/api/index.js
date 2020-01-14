/// tools ///
const express = require ('express')

/***************************************
  MAIN
***************************************/

const router = express.Router ()

router.get ('/', (ri, ro) => {
  ro
    .status (200)
    .send (`hello! i'm the api.`)
})

/**************************************/

/// exports ///
module.exports = router
