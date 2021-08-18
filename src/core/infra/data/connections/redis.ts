import IORedis from 'ioredis';
import dotenv from 'dotenv';

export class Redis {
    static #connection: IORedis.Redis;

    public static async getConnection(): Promise<IORedis.Redis> {
        if (!this.#connection) {
            await Redis.prototype.openConnection();
        }

        return this.#connection;
    }

    public async openConnection(): Promise<void> {
        if(!Redis.#connection) {
            Redis.#connection = new IORedis(process.env.REDIS_URL);
        }
    }
}