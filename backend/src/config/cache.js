const Redis = require("ioredis").default;

const redis = new Redis({
  port: process.env.PORT_REDIS, // Redis port
  host: process.env.HOST_REDIS, // Redis host
  password: process.env.PASSWORD_REDIS,
});

redis.on("connect",()=>{
    console.log("Server is connected to redis")
})

redis.on("error",(err)=>{
    console.log("radis error : " + err)
})


module.exports = redis

