import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($username:String!,$email:String!,$password:String!){
    createUser(username:$username,email:$email,password:$password){
      username
      email
      _id
    }
  }
`
export const SAVE_BOOK = gql`
  mutation saveBook($token:String!,$description:String!, $bookId:String!, $title:String!, $authors:[String],$link:String,$image:String){
    saveBook(token:$token,description:$description,bookId:$bookId,title:$title,authors:$authors,link:$link,image:$image){
      _id
      username
      savedBooks{
        authors
        description
        bookId
        link
        image
        title
      }
    }
  }
`
export const REMOVE_BOOK = gql`
  mutation removeBook($token:String!,$bookId:String!){
    removeBook(token:$token,bookId:$bookId){
      _id
      username
      savedBooks{
        authors
        description
        bookId
        link
        image
        title
      }
    }
  }
`
export const ADD_USER = gql`
  mutation addUser($username:String!,$email:String!,$password:String!){
    addUser(username:$username,email:$email,password:$password){
      token
    }
  }
`
export const LOGIN_USER=gql`
  mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
      token
    }
  }
`