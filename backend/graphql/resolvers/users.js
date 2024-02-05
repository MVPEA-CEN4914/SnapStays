const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const User = require("../../models/User");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

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

      //try to find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User not found", {
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

      //make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new GraphQLError("Username is taken", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      //hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullName,
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
