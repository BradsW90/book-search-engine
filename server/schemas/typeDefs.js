const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    title: String
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      bookId: String!
      authors: [String!]
      title: String!
      description: String!
      image: String
    ): User
    deleteBook(bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
