/// tools ///
const _ = require ('lodash/fp')
const express = require ('express')

/***************************************
  MAIN
***************************************/

const maybeSlash = _.cond ([
  // if it's an empty string, return '/'
  [_.eq (_.stubString), _.constant ('/')],
  // else, return it unchanged
  [_.stubTrue, _.identity],
])

const useRoutes = (app, routes, relEnvPath = './') => () => {
  _.forEach ((path) => {
    app.use (maybeSlash (path), require (`${relEnvPath}${path}`))
  }) (routes)
}

/**************************************/

/// exports ///
module.exports = useRoutes
