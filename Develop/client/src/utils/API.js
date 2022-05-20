// route to get logged in user's info (needs the token)
import {useMutation,useQuery} from "@apollo/client"
import {
  QUERY_SINGLE_USER
} from '../utils/queries'
import {
  CREATE_USER
}from "../utils/mutations"
//I CANT GET THIS API CALL TO WORK!! I EXHAUSTED ALL RESOURCES. 
const [getSingleUser,{error}]=useQuery(QUERY_SINGLE_USER)
const [postUser,{err}]=useMutation(CREATE_USER)


//this is what the getSingleUser call would look like if it would work.
export const getMe = async(token) => {
  // return fetch('/api/users/me', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${token}`,
  //   },
  // });
  try {
    return await getSingleUser({
      variables:{id:token}
    })
  } catch (error) {
    console.log(error);
  }
};
//this is what the createUser would look like if it would work
export const createUser = async(userData) => {
  // return fetch('/api/users', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(userData),
  // });
  try {
    return await postUser({
      variables:{userData}
    })
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
