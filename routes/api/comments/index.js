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

router.route ('/')
  .get ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })

/*******************
  /:id
*******************/

router.route ('/:id')
  .get ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })
  .put ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })
  .delete ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })

/**************************************/

/// exports ///
module.exports = router
