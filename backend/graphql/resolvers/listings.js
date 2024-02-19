const Listing = require('../../models/Listing');

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
                    throw new Error('Listing not found');
                }
            } catch (err) {
                throw new Error(err);
            }
    },
    Mutation: {
        async createTestListing() {
            try {
                const newListing = new Listing({
                    title : "testListing",
                    price : 1000,
                    numberOfRoommates : 2,
                    bathroomType : "shared",
                    location : "testLocation",
                    leaseDurationMonths : 12,
                    isFurnished : true,
                    utilitiesIncluded : true,
                    petsAllowed : true,
                    createdAt : new Date().toISOString(),
                });
                //console.log(newListing);
                const listing = await newListing.save();
                return listing;
            } catch (err) {
                throw new Error(err);
            }
        },
        async createListing(_, { listingInput}) {
        // const newListing = new Listing({
        //     title: listingInput.title,
        //     price: listingInput.price,
        //     numberOfRoommates: listingInput.numberOfRoommates,
        //     bathroomType: listingInput.bathroomType,
        //     location: listingInput.location,
        //     leaseDurationMonths: listingInput.leaseDurationMonths,
        //     isFurnished: listingInput.isFurnished,
        //     utilitiesIncluded: listingInput.utilitiesIncluded,
        //     petsAllowed: listingInput.petsAllowed,
        //     // owner : listingInput.owner,
        //     createdAt: new Date().toISOString(),
        // });
        const listing = await newListing.save();
        return listing;
        },
        async deleteListing(_, { listingId }) {
        try {
            const listing = await Listing.findById(listingId);
            await listing.delete();
            return 'Listing deleted successfully';
        } catch (err) {
            throw new Error(err);
        }
        },
    },
},
};