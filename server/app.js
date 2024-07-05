const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {typeDefs: typeDefsUsers, resolvers: resolversUser} = require('./schemas/users')
const {resolvers:  resolversPosts, typeDefs: typeDefsPosts} = require("./schemas/posts")
const {authentication} = require("./middlewares/authentication")

const server = new ApolloServer({
  typeDefs : [typeDefsUsers, typeDefsPosts],
  resolvers : [resolversUser, resolversPosts],
  introspection : true
});
(async () => {
  try {
    await startStandaloneServer(server, {
      listen: {
        port: process.env.PORT || 3000
      },
      context: ({ req }) => {
        return {
          authentication: async () => {
            return await authentication(req)
          }
        }
      }
    }).then(({ url }) => {
      console.log(url)
    });
  } catch (error) {
    console.log(error)
  }
})()
