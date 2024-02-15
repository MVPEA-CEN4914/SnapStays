const { model, Schema } = require('mongoose');

const SubleaseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numberOfRoommates: {
    type: Number,
    required: true
  },
  bathroomType: {
    type: String,
    enum: ['personal', 'shared'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  leaseDurationMonths: {
    type: Number,
    required: true
  },
  isFurnished: {
    type: Boolean,
    default: false
  },
  utilitiesIncluded: {
    type: Boolean,
    default: false
  },
  petsAllowed: {
    type: Boolean,
    default: false
  },
  //link it to a User denoting the listing is by this user
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
});

module.exports = mongoose.model('Sublease', SubleaseSchema);