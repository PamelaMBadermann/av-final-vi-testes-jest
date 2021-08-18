"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRepository = void 0;
const redis_1 = require("../data/connections/redis");
class CacheRepository {
    constructor() {
        this.setConnection();
    }
    async setConnection() {
        this.redis = await redis_1.Redis.getConnection();
    }
    async set(key, value) {
        return await this.redis.set(key, JSON.stringify(value));
    }
    async setex(key, value, ttl) {
        return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }
    async get(key) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }
    async del(key) {
        const result = await this.redis.del(key);
        return result !== 0;
    }
}
exports.CacheRepository = CacheRepository;
