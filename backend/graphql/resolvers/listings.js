const Listing = require("../../models/Listing");
const { findByIdAndDelete } = require("../../models/User");
const checkAuth = require("../../util/check-auth");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const { GraphQLError } = require("graphql");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}

module.exports = {
  Query: {
    async getListings() {
      try {
        const listings = await Listing.find().populate("user");
        return listings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListing(_, { listingId }) {
      try {
        const foundListing = await Listing.findById(listingId).populate("user");
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
        filter.title = { $regex: regexPattern };
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
        const listings = await Listing.find(filter).populate("user");
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
          // Delete images from Cloudinary before deleting the listing
          console.log(listing.images.length);
          if (listing.images.length > 0) {
            for (const imageUrl of listing.images) {
              // Extract the public ID from the image URL
              const publicId = parsePublicIdFromUrl(imageUrl);
              // Delete the image from Cloudinary
              await deleteImage(publicId);
            }
          }
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

// Function to parse the public ID from a Cloudinary image URL
function parsePublicIdFromUrl(imageUrl) {
  // Example URL: https://res.cloudinary.com/dyv2ynif2/image/upload/v1712198299/zzawepfsfllevhgd9og2.jpg
  // Extract the public ID between 'upload/' and the '.jpg'
  const startIndex = imageUrl.indexOf("upload/") + "upload/".length;
  const endIndex = imageUrl.lastIndexOf(".");
  const publicId = imageUrl.substring(startIndex, endIndex);
  // Remove the version number at the beginning of the public ID
  return publicId.split("/")[1]; // Extracting the part after the version number
}
