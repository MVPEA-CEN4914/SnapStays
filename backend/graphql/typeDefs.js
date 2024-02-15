const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    token: String!
    fullName: String!
    email: String!
    username: String!
    password: String!
    createdAt: String!
  }
  input RegisterInput {
    fullName: String!
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getUsers: [User]
    getListing: [Listing]
    getListing(listingId: ID!): Listing
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createListing(): Listing!
    deleteListing(listingId: ID!): String!
  }
`;