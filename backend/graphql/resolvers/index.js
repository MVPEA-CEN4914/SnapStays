const usersResolvers = require('./users');
const listingsResolvers = require('./listings');

module.exports = {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};