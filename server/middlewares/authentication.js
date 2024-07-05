const { verifyToken } = require("../helpers/jwt");
const database = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");


async function authentication(req, _) {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (!authorization || authorization === '') throw new Error("Invalid Token");
  
  // if(token[0] !== "Bearer ") throw new Error("Invalid Token TINONASIDH")
  
  const access_token = verifyToken(authorization);
  if (!access_token._id) throw new Error("Invalid Token");
  const user = await database.collection("User").findOne({
    _id: new ObjectId(access_token._id)
  })

  if (!user) throw new Error("Invalid Token");
  return user
}

module.exports = {
  authentication,
};
