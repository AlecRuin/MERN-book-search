import { gql } from "@apollo/client";

export const GET_ME=gql`
query me($token:String!){
    user(token:$token){
      username
    }
  }
`