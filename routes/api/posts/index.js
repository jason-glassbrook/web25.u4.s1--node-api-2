/*******************************************************************************
  ~/api/posts router
*******************************************************************************/

const _ = require ('lodash/fp')
const express = require ('express')

const db = require ('../../../data/db')

/***************************************
  setup router
***************************************/

const router = express.Router ()
const hello = {
  message : `hello! i'm ~/api/posts.`,
}
const error_404 = (thing, id) => ({
  error : `could not find ${thing} with id ${id}`,
})
const error_500 = () => ({
  error : `something bad happened`,
})

const shapeOf = {
  post : ['title', 'contents'],
  comment : ['post_id', 'text'],
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
    const maybePost = _.flow ([
      _.tap ((x) => console.log ('before:', x)),
      _.pick (shapeOf.post),
      _.tap ((x) => console.log ('after:', x)),
    ]) (ri.body)
    db.pushPost (maybePost)
      .then ((post) => {
        ro
          .status (201)
          .json (post)
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
  })

/*******************
  /:post_id
*******************/

router.route ('/:post_id')
  .get ((ri, ro) => {
    const { post_id } = ri.params
    db.getPost (post_id)
      .then ((post) => {
        if (_.has ('id') (post)) {
          ro
            .status (200)
            .json (post)
        }
        else {
          ro
            .status (404)
            .json (error_404 ('post', post_id))
        }
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
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
    const maybeComment = _.flow ([
      _.tap ((x) => console.log ('before:', x)),
      _.pick (shapeOf.comment),
      _.tap ((x) => console.log ('after:', x)),
    ]) ({ ...ri.body, post_id })

    db.pushCommentOfPost (maybeComment)
      .then ((comment) => {
        ro
          .status (201)
          .json (comment)
      })
      .catch ((error) => {
        ro
          .status (500)
          .json (error_500)
      })
  })

/**************************************/

/// exports ///
module.exports = router
