const Redis = require("ioredis").default;

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log("server is Connected to redis");
});

redis.on('message',(err)=>{
    console.log(err)
})

module.exports = redis;
