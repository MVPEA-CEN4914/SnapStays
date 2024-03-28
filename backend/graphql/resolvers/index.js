const usersResolvers = require('./users');
const listingsResolvers = require('./listings');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...listingsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...listingsResolvers.Mutation
  }
};