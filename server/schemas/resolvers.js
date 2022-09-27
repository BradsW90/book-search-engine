const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { id, username }) => {
      const params = id ? { id } : username ? { username } : {};
      return User.find(params);
    },
  },
  Mutation: {
    addUser: async (parent, { args }) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return User.findOneAndUpdate(
        { _id: context.user.id },
        { $addToSet: { savedBooks: { ...args } } },
        { new: true }
      );
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
