const usersResolvers = require("./users");
const listingsResolvers = require("./listings");
const { DateTimeResolver } = require('graphql-scalars');

module.exports = {
  ScalarName: DateTimeResolver,
  Query: {
    ...usersResolvers.Query,
    ...listingsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...listingsResolvers.Mutation,
  },
};
