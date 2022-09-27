const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
      _id: ID!
      bookId: String!
      authors: String!
      title: String!
      description: String!
      image: String
    ): User
    deleteBook(_id: ID!, bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
