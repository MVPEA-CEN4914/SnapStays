const Listing = require("../../models/Listing");

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
          leaseDurationMonths,
          isFurnished,
          utilitiesIncluded,
          petsAllowed,
        },
      }
    ) {
      const newListing = new Listing({
        title,
        price,
        numberOfRoommates,
        bathroomType,
        location,
        leaseDurationMonths,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        createdAt: new Date().toISOString(),
      });
      await newListing.save();

      const listings = await Listing.find();

      return listings;
    },

    async deleteListing(_, { listingId }) {
      try {
        const listing = await Listing.findById(listingId);
        await listing.delete();
        return "Listing deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
