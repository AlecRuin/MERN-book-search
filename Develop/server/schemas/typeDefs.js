const { gql } = require('apollo-server-express');
const typeDefs=gql`
type Book {
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
    savedBooks: [Book]
}

type Query {
    books: [Book]
    user(id: ID!): User
    users: [User]
}

type Auth{
    token: ID!
    user: User
}
type Mutation {
    saveBook(description:String!, bookId:String!, title:String!, authors:[String],link:String,image:String):User
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    deleteBook(bookId: String!): User
}
`;
module.exports=typeDefs