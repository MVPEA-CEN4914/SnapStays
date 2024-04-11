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
        location,
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
      if(location) {
        const regexPattern = new RegExp(location, "i");
        filter.location = { $regex: regexPattern };
      }

      try {
        const listings = await Listing.find(filter);
        return listings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getGeocode(_, { address }) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      //const url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600%20Amphitheatre%20Parkway,%20Mountain%20View,%20CA&key=AIzaSyC6S5cWS_2Bt8JurLZuM3VOWTtGaWkRXyU";

      try {
        console.log('url:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('data from geocode:', data);

        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng
        };
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch geocode data');
      }
    },
    // async getCoordinates(location) {
    //   const response = await client.geocode({
    //     params: {
    //       address: location,
    //       key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    //     },
    //   });
    
    //   if (response.status === 200) {
    //     const lat = response.data.results[0].geometry.location.lat;
    //     const lng = response.data.results[0].geometry.location.lng;
    //     return { lat, lng };
    //   } else {
    //     throw new Error("Failed to get coordinates");
    //   }
    // },
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
        price,
        numberOfRoommates,
        bathroomType,
        location,
        leaseStartDate,
        leaseEndDate,
        isFurnished,
        utilitiesIncluded,
        petsAllowed,
        description,
        images,
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
