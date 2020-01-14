const knex = require ('knex')
const knexConfig = require ('../knexfile.js')
const db = knex (knexConfig.development)

module.exports = {
  getAllPosts,
  getPost,
  pushPost,
  setPost,
  pullPost,
  getAllComments,
  getPostComments,
  getComment,
  pushComment,
}

/***************************************
  posts
***************************************/

async function getAllPosts () {
  const re = await (
    db ('posts')
  )
  return re
}

async function pushPost (post) {
  const re = await (
    db ('posts')
      .insert (post, 'id')
      .then (ids => ({ id: ids[0] }))
  )
  return re
}

async function getPost (id) {
  const re = await (
    db ('posts')
      .where ({ id: Number (id) })
  )
  return re
}

async function setPost (id, post) {
  const status = await (
    db ('posts')
      .where ('id', Number (id))
      .update (post)
  )
  const re = getPost (id)
  return re
}

async function pullPost (id) {
  const re = getPost (id)
  const status = await (
    db ('posts')
      .where ('id', Number (id))
      .delete ()
  )
  return re
}

/***************************************
  comments
***************************************/

async function getPostComments (postId) {
  const re = await (
    db ('comments')
      .join ('posts', 'posts.id', 'post_id')
      .select ('comments.*', 'title as post')
      .where ('post_id', postId)
  )
  return re
}

async function getAllComments () {
  const re = await (
    db ('comments')
  )
  return re
}

async function getComment (id) {
  const re = await (
    db ('comments')
      .join ('posts', 'posts.id', 'post_id')
      .select ('comments.*', 'title as post')
      .where ('comments.id', id)
  )
  return re
}

async function pushComment (comment) {
  const re = await (
    db ('comments')
      .insert (comment)
      .then (ids => ({ id: ids[0] }))
  )
  return re
}
