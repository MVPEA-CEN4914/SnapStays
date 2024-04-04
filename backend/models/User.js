const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  about: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  favorites: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    default: []
  },
  
});

module.exports = model("User", userSchema);
