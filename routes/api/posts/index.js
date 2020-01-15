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
  /:post_id
*******************/

router.route ('/:post_id')
  .get ((ri, ro) => {
    const { post_id } = ri.params
    db.getPost (post_id)
      .then ((post) => {
        ro
          .status (200)
          .json (post)
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
  })
  .post ((ri, ro) => {
    const { post_id } = ri.params
    ro
      .status (501)
      .json (hello)
  })
  .put ((ri, ro) => {
    const { post_id } = ri.params
    ro
      .status (501)
      .json (hello)
  })
  .delete ((ri, ro) => {
    const { post_id } = ri.params
    ro
      .status (501)
      .json (hello)
  })

/*******************
  /:post_id/comments
*******************/

router.route ('/:post_id/comments')
  .get ((ri, ro) => {
    const { post_id } = ri.params
    db.getAllCommentsOfPost (post_id)
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
  .post ((ri, ro) => {
    const { post_id } = ri.params
    ro
      .status (501)
      .json (hello)
  })

/**************************************/

/// exports ///
module.exports = router
