const Redis = require("ioredis")
const redis = new Redis({
    port: 14821,
    host: 'redis-14821.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
    username: "default",
    password: process.env.REDIS_SECRET,
    db: 0
}); 
module.exports = redis