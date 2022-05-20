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
    savedBooks: [Book]
}

type Query {
    me(token:String!): User
}

type Auth{
    token: ID!
    user: User
}
type Mutation {
    saveBook(description:String!, bookId:String!, title:String!, authors:[String],link:String,image:String):User
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeBook(token:String!,bookId: String!): User
}
`;
module.exports=typeDefs