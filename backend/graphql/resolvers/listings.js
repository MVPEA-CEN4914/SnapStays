const Listing = require('../../models/Listing');

module.exports = {
    Query: {
        async getListing() {
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
        async createListing(_, { title, description, price, location }) {
        const newListing = new Listing({
            title,
            description,
            price,
            location,
            createdAt: new Date().toISOString(),
        });
    
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