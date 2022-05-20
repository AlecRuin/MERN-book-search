const { gql } = require('apollo-server-express');
const typeDefs=gql`
type Book {
  _id: ID
  authors: [String]
  description: String
  bookId: String
  link: String
  image: String
  title: String
}
type User{
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: __Schema
}
type Query {
    books: [Book]
    user(id: ID!): User
    users: User
  }
type Mutation {
    createUser(username: String!, email: String!, password: String!): User
}
`;
module.exports=typeDefs