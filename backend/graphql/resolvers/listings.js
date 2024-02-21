const Listing = require("../../models/Listing");
const { findByIdAndDelete } = require("../../models/User");
const checkAuth = require("../../util/check-auth");

const { GraphQLError } = require("graphql");

module.exports = {
  Query: {
    async getListings() {
      try {
        const listings = await Listing.find();
        return listings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListing(_, { listingId }) {
      try {
        const Listing = await Listing.findById(listingId);
        if (Listing) {
          return Listing;
        } else {
          throw new Error("Listing not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createListing(
      _,
      {
        listingInput: {
          title,
          price,
          numberOfRoommates,
          bathroomType,
          location,
          leaseStartDate,
          leaseEndDate,
          isFurnished,
          utilitiesIncluded,
          petsAllowed,
        },
      }, context
    ) {
      
      //console.log(context.req.headers.authorization);
      const user = checkAuth(context);
      console.log(user);

      const newListing = new Listing({
        user: user.id,
        title,
        price,
        numberOfRoommates,
        bathroomType,
        location,
        leaseStartDate,
        leaseEndDate,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        createdAt: new Date().toISOString(),
      });
      await newListing.save();

      //const listings = await Listing.find();

      return newListing;
    },

    async deleteListing(_, { listingId }, context) {
      const user = checkAuth(context);

      try {
        const listing = await Listing.findById(listingId);

        console.log(listing);
        //user should only be able to delete their own posts
        if (user.id == listing.user) 
        {
          await Listing.findByIdAndDelete(listingId);
          return "Listing deleted successfully";
        } else 
        {
          throw new Error("This is not your listing");
        }
      } catch (err) {
        throw new Error(err);
      }

    },
  },
};
