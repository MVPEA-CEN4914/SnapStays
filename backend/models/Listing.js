const { model, Schema } = require("mongoose");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfRoommates: {
    type: Number,
    required: true,
  },
  bathroomType: {
    type: String,
    enum: ['personal', 'shared'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  leaseStartDate: {
    type: String,
    required: true,
  },
  leaseEndDate: {
    type: String,
    required: true,
  },
  isFurnished: {
    type: Boolean,
    default: false,
  },
  utilitiesIncluded: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model("Listing", listingSchema);
