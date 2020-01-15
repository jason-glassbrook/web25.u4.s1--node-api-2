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
const error_400 = (request, thing) => ({
  error : `bad request to ${request} ${thing}`,
})
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
const tryShapeOf = (shape) => (
  _.flow ([
    // _.tap ((x) => console.log ('- before:', x)),
    _.pick (shape),
    // _.tap ((x) => console.log ('- after:', x)),
  ])
)
const hasShapeOf = (shape) => (
  _.flow ([
    // _.tap ((x) => console.log ('- :', x)),
    _.keys,
    // _.tap ((x) => console.log ('- :', x)),
    _.difference (shape),
    // _.tap ((x) => console.log ('- :', x)),
    _.isEmpty,
    // _.tap ((x) => console.log ('- :', x)),
  ])
)

// const log = (message) =>
//   _.tap ((x) => console.log (message, x))

// const logInit = (fun) =>
//   _.flow ([
//     log ('- init:'),
//     fun,
//   ])

// const logExit = (fun) =>
//   _.flow ([
//     fun,
//     log ('- exit:'),
//   ])

// const logEnds = (fun) =>
//   // _.flow ([ logInit, logExit ]) (fun)
//   _.flow ([
//     log ('- init:'),
//     fun,
//     log ('- exit:'),
//   ])

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
        console.log (posts)
        ro
          .status (200)
          .json (posts)
      })
      .catch ((error) => {
        console.log (error)
        ro
          .status (500)
          .json (error_500 ())
      })
  })
  .post ((ri, ro) => {
    const maybePost = tryShapeOf (shapeOf.post) (ri.body)

    if (hasShapeOf (shapeOf.post) (maybePost)) {
      db.pushPost (maybePost)
        .then ((post) => {
          console.log (post)
          ro
            .status (201)
            .json (post)
        })
        .catch ((error) => {
          console.log (error)
          ro
            .status (500)
            .json (error_500 ())
        })
    }
    else {
      console.log ('bad request')
      ro
        .status (400)
        .json (error_400 ('POST', 'post'))
    }
  })

/*******************
  /:post_id
*******************/

router.route ('/:post_id')
  .get ((ri, ro) => {
    const { post_id } = ri.params

    db.getPost (post_id)
      .then (([ post ]) => {
        console.log (post)
        if (post) {
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
        console.log (error)
        ro
          .status (500)
          .json (error_500 ())
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
        console.log (comments)
        ro
          .status (200)
          .json (comments)
      })
      .catch ((error) => {
        console.log (error)
        ro
          .status (500)
          .json (error_500 ())
      })
  })
  .post ((ri, ro) => {
    const { post_id } = ri.params

    const maybeComment = tryShapeOf (shapeOf.comment) ({
      ...ri.body,
      post_id,
    })

    if (hasShapeOf (shapeOf.comment) (maybeComment)) {
      db.pushCommentOfPost (maybeComment)
        .then ((comment) => {
          console.log (comment)
          ro
            .status (201)
            .json (comment)
        })
        .catch ((error) => {
          console.log (error)
          ro
            .status (500)
            .json (error_500 ())
        })
    }
    else {
      console.log ('bad request')
      ro
        .status (400)
        .json (error_400 ('POST', 'comment'))
    }
  })

/**************************************/

/// exports ///
module.exports = router
