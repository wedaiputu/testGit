const database = require("../config/mongoConnection");
const validator = require("validator");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

class User {
  static async findAll() {
    const userCollection = database.collection("User");
    const data = await userCollection.find().toArray();
    return data;
  }
  static async findOneUser(_, ___, __) {
    const userCollection = database.collection("User");
    return await userCollection.findOne();
  }
  static async create(_, args) {
    const { name, username, email, password } = args;
    if (!validator.isEmail(email)) {
      throw new Error("format email invalid");
    }
    if(password.length < 5) {
      throw new Error("min password length 5")
    }
    
    const userCollection = database.collection("User");
    const cekEmail = await userCollection.findOne({
      email,
    });
    if (cekEmail) {
      throw new Error("email already exist");
    }
    const cekUsername = await userCollection.findOne({
      username
    })
    if(cekUsername) {
      throw new Error("username already exist")
    }

    const user = await userCollection.insertOne({
      name,
      username,
      email,
      password: hashPassword(password),
    });
    return {
      _id: user.insertedId,
      name,
      username,
      email,
    };
  }
  static async login(_, args, __) {
    const { email, password } = args;
    
    const userCollection = database.collection("User");
    const data = await userCollection.findOne({
      $or: [
        { email },
        { password }
      ]
    });

    if (!data) {
      throw new Error("loginfailed");
    }

    const token = signToken({
      _id: data._id,
      email: data.email,
    });
    return {
      access_token: token
    };
  }
  static async follow(_, args, context) {
    const authentication = await context.authentication();
    // console.log(authentication,'===');
    if (!authentication) throw new Error("Invalid Token");
    
    const { followingId } = args;
    const userCollection = database.collection("User");
    const followed = await userCollection.findOne({
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(authentication),
    });
    if (followed) throw new Error("Already Follow");

    const follow = {
      followingId: new ObjectId(followingId),
      followerId: new ObjectId(authentication),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await userCollection.insertOne(follow);
    return follow;
  }

  static async searchUser(_, args, context) {
    const authorization = await context.authentication();
    if (!authorization) {
      throw new Error("Invalid Token");
    }

    const { nameOrUsername } = args.searchUser;

    const userCollection = database.collection("User");
    const users = await userCollection
      .find({
        $or: [
          { name: { $regex: nameOrUsername, $options: "i" } },
          { username: { $regex: nameOrUsername, $options: "i" } },
        ],
      })
      .project({ password: 0 })
      .toArray();

    return users;
  }

  static async userById(_, args, context) {
    try {
      const authorization = await context.authentication();
      if (!authorization) {
        throw new Error("Invalid Token");
      }

      const _id = args._id || authorization;
      

      const userCollection = database.collection("User");
      const user = await userCollection
      .findOne({ _id: new ObjectId(_id) })
      
      const getFollows = async (matchField, projectField) => {
        return database.collection("Follows").aggregate([
          { $match: { [matchField]: new ObjectId(_id) } },
          {
            $lookup: {
              from: "Users",
              localField: matchField === "followingId" ? "followerId" : "followingId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $set: {
              user: { $first: "$user" },
            },
          },
          {
            $project: {
              [`user.${projectField}._id`]: 1,
              [`user.${projectField}.name`]: 1,
              [`user.${projectField}.username`]: 1,
              [`user.${projectField}.email`]: 1,
            },
          },
        ]).toArray();
      };

      const followers = await getFollows("followingId", "follower");
      const followings = await getFollows("followerId", "following");

      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        followers: followers,
        followings: followings,
      };
    } catch (error) {
      throw error
    }
  }
}

module.exports = User;
