const Listing = require("../../models/Listing");
const { findByIdAndDelete } = require("../../models/User");
const checkAuth = require("../../util/check-auth");

const { GraphQLError } = require("graphql");

module.exports = {
  Query: {
    async getListings() {
      try {
        const listings = await Listing.find().populate('user');
        return listings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListing(_, {listingId}) {
      try {
        const foundListing = await Listing.findById(listingId).populate('user');
        if (foundListing) {
          return foundListing;
        } else {
          throw new Error("Listing not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getFilteredListings(_, args) {
      // Destructure the input arguments
      const {
        title,
        price,
        numberOfRoommates,
        bathroomType,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
      } = args.filteredInput;

      const filter = {};
      if (title != null) {
        const regexPattern = new RegExp(title, "i");
        filter.title = { $regex: regexPattern};
      }
      if (price && price.length > 0) {
        filter.price = { $gt: price[0], $lt: price[1] };
      }
      if (numberOfRoommates != "any") {
        filter.numberOfRoommates = parseInt(numberOfRoommates);
      }
      if (bathroomType != "any") {
        filter.bathroomType = bathroomType;
      }
      if (isFurnished) {
        filter.isFurnished = isFurnished;
      }
      if (utilitiesIncluded) {
        filter.utilitiesIncluded = utilitiesIncluded;
      }
      if (petsAllowed) {
        filter.petsAllowed = petsAllowed;
      }

      try {
        const listings = await Listing.find(filter);
        return listings;
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
          location,
          price,
          leaseStartDate,
          leaseEndDate,
          numberOfRoommates,
          bathroomType,
          isFurnished,
          utilitiesIncluded,
          petsAllowed,
          description,
          images,
        },
      },
      context
    ) {
      const user = checkAuth(context);

      const newListing = new Listing({
        user: user.id,
        title,
        location,
        price,
        leaseStartDate,
        leaseEndDate,
        numberOfRoommates,
        bathroomType,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        description,
        images,
        createdAt: new Date().toISOString(),
      });
      await newListing.save();

      return newListing;
    },

    async deleteListing(_, { listingId }, context) {
      const user = checkAuth(context);

      try {
        const listing = await Listing.findById(listingId);
        //user should only be able to delete their own posts
        if (user.id == listing.user) {
          await Listing.findByIdAndDelete(listingId);
          return "Listing deleted successfully";
        } else {
          throw new Error("This is not your listing");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
