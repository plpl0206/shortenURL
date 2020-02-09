var redis = require('redis');
const redisConfig = require('../config.json')['redis'];


let redisClient;

const getRedisInstance = () => {
    
    if (redisClient == null) {
        redisClient = redis.createClient(redisConfig);
    }
    return redisClient;
};

module.exports = { getRedisInstance };