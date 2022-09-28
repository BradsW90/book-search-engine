const { gql } = require("@apollo/client");

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        savedBooks {
          bookId
          authors
          description
          title
          image
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        savedBooks {
          bookId
          authors
          description
          title
          image
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $authors: [String!]
    $title: String!
    $description: String!
    $image: String
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      title: $title
      description: $description
      image: $image
    ) {
      _id
      username
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
        description
        image
        authors
      }
    }
  }
`;
