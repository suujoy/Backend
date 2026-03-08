const Redis = require("ioredis").default;

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log(`Connected To Redis`);
});

redis.on("error", (err) => {
    console.log(err);
});

module.exports = redis;
