const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { GraphQLError } = require("graphql");

const User = require("../../models/User");

const {
  validateRegisterInput,
  validateLoginInput,
  validateForgotPasswordInput,
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

      //make sure user doesn't already exist
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new GraphQLError("Username is taken", {
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
  },
};
