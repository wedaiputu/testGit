const User = require("../models/user");

const typeDefs = `#graphql
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String
    createdAt: String
    updatedAt: String
  }

  type UserData {
    _id: ID
    name: String
    username: String
    email: String
    followers: [FollowData]
    followings: [FollowData]
  }
  type FollowData {
    _id: ID
    user: SearchResponse
  }

  input SearchUser {
    nameOrUsername: String
  }

  type SearchResponse {
    _id: ID
    name: String
    username: String
    email: String
  }

  type Token {
    access_token: String
  }

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }
  type Query {
    users: [User]
    userLogin(
      email: String!
      password: String!
      ): Token
      searchUser(searchUser: SearchUser): [SearchResponse]
      userById(_id: ID): UserData
  }

  type Mutation {

    usersRegistration(
      name: String
      username: String!
      email: String!
      password: String!
      ): User,
    follow(
      followingId: ID
      followerId: ID
    ): Follow
  }
  
`;

const resolvers = {
  Query: {
    users: async (_, args, __) => {
      const data = await User.findAll(_, args);
      return data;
    },
    searchUser: async (_, args, context) => {
      const data = await User.searchUser(_, args, context);

      return data;
    },
    userLogin: async (_, args, __) => {
      const data = await User.login(_, args);
      return data;
    },
    userById: async (_, args, context) => {
      const data = await User.userById(_, args, context)
      return data
    }
  },
  Mutation: {
    usersRegistration: async (_, args, __) => {
      const createUser = await User.create(_, args);
      return createUser;
    },

    follow: async (_, args, context) => {
      const data = await User.follow(_, args, context);
      return data;
    },
  },
};

module.exports = { typeDefs, resolvers };
