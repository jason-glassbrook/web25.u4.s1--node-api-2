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
    db.getAllPosts ()
      .then ((posts) => {
        ro
          .status (200)
          .json (posts)
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
  })
  .post ((ri, ro) => {
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
  .post ((ri, ro) => {
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

/*******************
  /:id/comments
*******************/

router.route ('/:id/comments')
  .get ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })
  .post ((ri, ro) => {
    ro
      .status (501)
      .json (hello)
  })

/**************************************/

/// exports ///
module.exports = router
