import { gql } from "@apollo/client"


export const LOGIN = gql`
query Query($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    access_token
  }
}
`
export const ADD = gql`
  mutation Mutation($content: String!, $tags: [String], $imgUrl: String) {
  postsAdd(content: $content, tags: $tags, imgUrl: $imgUrl) {
    _id
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    content
    createdAt
    imgUrl
    likes {
      username
      createdAt
      updatedAt
    }
    tags
    updatedAt
  }
}
`
export const USERBYID = gql`
query Query($id: ID) {
  userById(_id: $id) {
    _id
    email
    followers {
      _id
      user {
        _id
        email
        name
        username
      }
    }
    followings {
      _id
      user {
        _id
        email
        name
        username
      }
    }
    name
    username
  }
}
`

export const POSTS = gql`
query Query {
  posts {
    _id
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    user {
      _id
      name
      username
      email
      password
      createdAt
      updatedAt
    }
    updatedAt
    tags
    likes {
      username
      createdAt
      updatedAt
    }
    imgUrl
    createdAt
    content
  }
}
`

export const REGISTER = gql`
mutation UsersRegistration($username: String!, $email: String!, $password: String!, $name: String) {
  usersRegistration(username: $username, email: $email, password: $password, name: $name) {
    email
    _id
    createdAt
    name
    password
    updatedAt
    username
  }
}
`

export const USERS = gql`
query Users {
  users {
    _id
    createdAt
    email
    name
    password
    updatedAt
    username
  }
}
`