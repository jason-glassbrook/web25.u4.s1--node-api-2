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
const error_500 = {
  error : 'something bad happened',
}

/***************************************
  handle requests
***************************************/

/*******************
  /
*******************/

router.route ('/')
  .get ((ri, ro) => {
    db.getAllComments ()
      .then ((comments) => {
        ro
          .status (200)
          .json (comments)
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
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
