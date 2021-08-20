import IORedis from 'ioredis';
import { Redis } from '../data/connections/redis';

export class CacheRepository {
    private redis!: IORedis.Redis;

    constructor() {
        this.setConnection();
    }

    private async setConnection() {
        this.redis = await Redis.getConnection();
    }

    public async set(key: string, value: any): Promise<string | null>  {
        return await this.redis.set(key, JSON.stringify(value));
    }

    public async setex(key: string, value: any, ttl: number): Promise<string | null>  {
        return await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    }

    public async get(key: string): Promise<any | null> {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    }

    public async del(key: string): Promise<boolean> {
        const result = await this.redis.del(key);

        return result !== 0;
    }
}