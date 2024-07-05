// const database = require("../connection");
// const redis = require("../config/redisConnection");
const Posts = require("../models/posts");

const typeDefs = `#graphql
  type Posts {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
  }

  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    user: User
  }

  type Comments{
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Likes{
    username: String
    createdAt: String
    updatedAt: String
  }

type Query {
    posts: [Post]
}

type Mutation {

  postsAdd(
      content: String!
      tags: [String]
      imgUrl: String      
    ): Posts,

  postsComment(
      postId: ID!
      content: String!
  ): Posts,

  like(postId: ID!): Posts
}
`;

const resolvers = {
  Query: {
    posts: async (_, args, context) => {
      try {
        const data = await Posts.getPosts(_, args, context);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    postsAdd: async (_, args, context) => {
      console.log(context);
      const posts = await Posts.postsAdd(_, args, context);

      return posts;
    },

    postsComment: async (_, args, context) => {
      const posts = await Posts.postsComment(_, args, context);
      return posts;
    },

    like: async (_, args, context) => {
      const posts = await Posts.like(_, args, context);
      return posts;
    },
  },
};

module.exports = { resolvers, typeDefs };
