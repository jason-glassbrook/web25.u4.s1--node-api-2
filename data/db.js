const knex = require ('knex')
const knexConfig = require ('../knexfile.js')
const db = knex (knexConfig.development)

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
}

async function find () {
  const re = await (
    db ('posts')
  )
  return re
}

async function findById (id) {
  const re = await (
    db ('posts')
      .where ({ id: Number (id) })
  )
  return re
}

async function insert (post) {
  const re = await (
    db ('posts')
      .insert (post, 'id')
      .then (ids => ({ id: ids[0] }))
  )
  return re
}

async function update (id, post) {
  const status = await (
    db ('posts')
      .where ('id', Number (id))
      .update (post)
  )
  const re = findById (id)
  return re
}

async function remove (id) {
  const re = findById (id)
  const status = await (
    db ('posts')
      .where ('id', Number (id))
      .delete ()
  )
  return re
}

async function findPostComments (postId) {
  const re = await (
    db ('comments')
      .join ('posts', 'posts.id', 'post_id')
      .select ('comments.*', 'title as post')
      .where ('post_id', postId)
  )
  return re
}

async function findCommentById (id) {
  const re = await (
    db ('comments')
      .join ('posts', 'posts.id', 'post_id')
      .select ('comments.*', 'title as post')
      .where ('comments.id', id)
  )
  return re
}

async function insertComment (comment) {
  const re = await (
    db ('comments')
      .insert (comment)
      .then (ids => ({ id: ids[0] }))
  )
  return re
}
