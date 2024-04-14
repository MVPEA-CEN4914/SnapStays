const usersResolvers = require("./users");
const listingsResolvers = require("./listings");
const messagesResolvers = require("./messages");
const { DateTimeResolver } = require('graphql-scalars');

module.exports = {
  ScalarName: DateTimeResolver,
  Query: {
    ...usersResolvers.Query,
    ...listingsResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...listingsResolvers.Mutation,
    ...messagesResolvers.Mutation, 
  },
};
