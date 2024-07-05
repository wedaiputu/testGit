const database = require("../config/mongoConnection");
// const database = require("../connection");
const redis = require("../config/redisConnection");
const { ObjectId } = require("mongodb");

class Posts {
  static async getPosts(_, args, context) {
    try {
      const authentication = await context.authentication();

      if (!authentication) {
        throw new Error("Invalid Token");
      }
      let postsRedis = await redis.get("posts");

      if (!postsRedis) {
        postsRedis = await database
          .collection("Posts")
          .aggregate([
            { $sort: { createdAt: -1 } },
            {
              $lookup: {
                from: "User",
                localField: "authorId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $set: { user: { $first: "$user" } },
            }
          ])
          .toArray();
        await redis.set("posts", JSON.stringify(postsRedis));
        return postsRedis;
      } else {
        return JSON.parse(postsRedis);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  static async postsAdd(_, args, context) {
    try {
      const authentication = await context.authentication();
      // console.log(authentication,'==');
      
      if (!authentication) {
        throw new Error("Invalid Token");
      }
      const authorIdNew = authentication._id
      const { content, tags, imgUrl } = args;

      const createdAt = new Date()
      const updatedAt = new Date()
      
      const postsCollection = database.collection("Posts");
      
      const data = await postsCollection.insertOne({
        content,
        tags,
        imgUrl,
        authorId: authorIdNew,
        comments: [],
        likes: [],
        createdAt,
        updatedAt,
        
      });
      await redis.del("posts");
      return {
        _id: data.insertedId,
        content,
        tags,
        imgUrl,
        authorId: authorIdNew,
        comments: [],
        likes: [],
        createdAt,
        updatedAt,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  }
  static async postsComment(_, args, context) {
    try {
      const authentication = await context.authentication();
      if (!authentication) {
        throw new Error("Invalid Token");
      }
      const { content, postId } = args;
      const createdAt = new Date()
      const updatedAt = new Date()
      const postsCollection = database.collection("Posts");
      await postsCollection.updateOne(
        {
          _id: new ObjectId(postId),
        },
        {
          $push: {
            comments: {
              username: authentication.username,
              content,
              createdAt,
              updatedAt
            },
          },
          $set: {
            updatedAt: new Date()
          }
        }
      );
      const findComment = await postsCollection.findOne({
        _id: new ObjectId(postId),
      });
      const findUser = await database.collection("User").findOne({
        _id: findComment.authorId
      })
      // console.log(findComment, "==");
      await redis.del("posts");
      return {
        ...findComment,
        user: findUser
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  static async like(_, args, context) {
    const authorization = await context.authentication();
    if (!authorization) throw new Error("Invalid Token");
    const { postId } = args;

    const alreadyLike = await database
      .collection("Posts")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(postId),
          },
        },
        {
          $unwind: "$likes",
        },
        {
          $match: {
            "likes.username": authorization.username,
          },
        },
      ])
      .toArray();

    if (alreadyLike.length > 0) throw new Error("Posts Already Like");

    const like = {
      username: authorization.username,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await database.collection("Posts").updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          likes: like,
        },
      }
    );

    await redis.del("posts");
    const findLikes = await database.collection("Posts").findOne({
      _id: new ObjectId(postId),
    });
    return findLikes
  }
}

module.exports = Posts;
