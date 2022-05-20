import { gql } from "@apollo/client";

export const QUERY_SINGLE_USER=gql`
query getUser($id:ID!){
    user(id:$id){
      username
    }
  }
`