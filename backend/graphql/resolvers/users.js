const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { GraphQLError } = require("graphql");
const checkAuth = require("../../util/check-auth");
const Listing = require("../../models/Listing");

const User = require("../../models/User");
const { findById } = require("../../models/User");
const cloudinary = require("cloudinary").v2;

const {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
} = require("../../util/validators");

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

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
}

const sendMail = (id, to, purpose) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let optionData = {};

  if (purpose == "verify") {
    optionData = {
      subject: "SnapStays: Verify Your Email",
      html:
        "<h1>Thank you for choosing SnapStays!</h1>" +
        "<p>Finish the registration process by verifying your email:\n</p>" +
        `<a href=${process.env.CLIENT_URL}verify/${id}>` +
        `${process.env.CLIENT_URL}verify/${id}`,
    };
  } else if (purpose == "forgotPassword") {
    optionData = {
      subject: "SnapStays: Reset Your Password",
      html:
        "<p>Please use the following link to reset your password.</p>" +
        "<p>If you did not ask to reset your password, you may ignore this email:\n</p>" +
        `<a href=${process.env.CLIENT_URL}reset-password/${id}>` +
        `${process.env.CLIENT_URL}reset-password/${id}`,
    };
  }

  const options = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject: optionData.subject,
    html: optionData.html,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) console.log(error);
    else console.log(info);
  });
};

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, {userId}){
      try{
        console.log(userId);
        const user = await User.findById(userId).populate('favorites');
        console.log(user);
        if(user){
          return user;
        }else{
          throw new Error("User not found");
        }
      }catch(err){
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      //validate user data
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: { errors },
        });
      }

      //try to find verified user
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      } else if (!user.verified) {
        throw new GraphQLError("User not verified", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      //confirm if right login info
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new GraphQLError("Wrong crendetials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      {
        registerInput: { fullName, email, username, password, confirmPassword },
      }
    ) {
      //validate user data
      const { valid, errors } = validateRegisterInput(
        fullName,
        email,
        username,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: { errors },
        });
      }

      //make sure username doesn't already exist
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        throw new GraphQLError("Username is taken", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        throw new GraphQLError("An account with this email already exists", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      //hash password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullName,
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      //send verification email using newly made user's id
      const user = await User.findOne({ email });

      sendMail(user._id, user.email, "verify");

      //create auth token
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async verifyUser(_, { id }) {
      const user = await User.findOneAndUpdate({ _id: id }, { verified: true });

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return user;
    },
    async forgotPassword(_, { email }) {
      //validate user data
      const { valid, errors } = validateForgotPasswordInput(email);
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: { errors },
        });
      }

      //find user to send email to
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      sendMail(user._id, user.email, "forgotPassword");

      return user;
    },
    async resetPassword(
      _,
      { resetPasswordInput: { id, password, confirmPassword } }
    ) {
      //validate user data
      const { valid, errors } = validateResetPasswordInput(
        password,
        confirmPassword
      );
      if (!valid) {
        throw new GraphQLError("Errors", {
          extensions: { errors },
        });
      }

      //hash password
      password = await bcrypt.hash(password, 12);

      //find user and reset their password
      const user = await User.findOneAndUpdate({ _id: id }, { password: password });

      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return user;
    },
    async addListingToFavorites(_, { listingId }, context) {
      const authUser = checkAuth(context);
      if (!authUser) throw new Error('Authentication required');
    
      const user = await User.findById(authUser.id);
    
      const listing = await Listing.findById(listingId);
      
      if (!listing) throw new Error('Listing not found');
      
      //find the index of the listing in the user's favorites
      const index = user.favorites.findIndex(favoriteId => favoriteId.toString() === listingId);
    
      if (index !== -1) {
        //listing is already favorited, so remove it
        user.favorites.splice(index, 1);
      } else {
        //listing is not in favorites, so add it
        user.favorites.push(listingId);
      }
    
      await user.save();
    
      return User.findById(authUser.id).populate('favorites');
    },
    async editUserProfile(_,{id, fullName,username, about, image}) {
      //check if user exists 
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      // Update user data only if user wants to 
    if (fullName) {
      user.fullName = fullName;
    }
    if (about) {
      user.about = about;
    }
    // Check if username needs to be updated and validate uniqueness
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already taken');
      }
      user.username = username;
    }
    // Update user's image URL if provided
  if (image !== null) {
    if (user.image) {
      // Delete the old image if it exists
      const publicId = parsePublicIdFromUrl(user.image);
      await deleteImage(publicId);
    }
    user.image = image;
  } else {
    // If image is set to null, delete the old image
    if (user.image) {
      const publicId = parsePublicIdFromUrl(user.image);
      await deleteImage(publicId);
    }
    user.image = null;
  }

    // Save changes to the database
    await user.save();

    return user;
    }   
  },
};

function parsePublicIdFromUrl(imageUrl) {
  // Example URL: https://res.cloudinary.com/dyv2ynif2/image/upload/v1712198299/zzawepfsfllevhgd9og2.jpg
  // Extract the public ID between 'upload/' and the '.jpg'
  const startIndex = imageUrl.indexOf("upload/") + "upload/".length;
  const endIndex = imageUrl.lastIndexOf(".");
  const publicId = imageUrl.substring(startIndex, endIndex);
  // Remove the version number at the beginning of the public ID
  return publicId.split("/")[1]; // Extracting the part after the version number
}