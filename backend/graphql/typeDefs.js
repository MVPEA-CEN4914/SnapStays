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
    verified: Boolean!
    favorites: [Listing]
    about: String!
  }

  type Listing {
    id: ID!
    title: String!
    price: Float!
    numberOfRoommates: Int!
    bathroomType: String!
    location: String!
    leaseStartDate: String!
    leaseEndDate: String!
    isFurnished: Boolean!
    utilitiesIncluded: Boolean!
    petsAllowed: Boolean!
    description: String
    images: [String]
    createdAt: String!
    user: User!
  }

  input RegisterInput {
    fullName: String!
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input ResetPasswordInput {
    id: ID!
    password: String!
    confirmPassword: String!
  }

  input ListingInput {
    title: String!
    price: Float!
    numberOfRoommates: Int!
    bathroomType: String!
    location: String!
    leaseStartDate: String!
    leaseEndDate: String!
    isFurnished: Boolean!
    utilitiesIncluded: Boolean!
    petsAllowed: Boolean!
    description: String
    images: [String]
  }

  input FilteredInput {
    title: String
    price: [Int]!
    numberOfRoommates: String!
    bathroomType: String!
    isFurnished: Boolean!
    utilitiesIncluded: Boolean!
    petsAllowed: Boolean!
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User 
    getListings: [Listing]
    getListing(listingId: ID!): Listing
    getFilteredListings(filteredInput: FilteredInput): [Listing]
    getFavorites(id: ID!): [Listing]
    getCoordinates(location: String!): Listing
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createListing(listingInput: ListingInput): Listing!
    deleteListing(listingId: ID!): String!
    verifyUser(id: ID!): User!
    forgotPassword(email: String!): User!
    resetPassword(resetPasswordInput: ResetPasswordInput): User!
    addListingToFavorites(listingId: ID!): User!
    updateAbout(userId: ID!, about: String!): User!
    updateUser(userId:ID!, fullName: String!, username: String!, about: String!): User!
    
  }
`;
