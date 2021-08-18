"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _Redis_connection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class Redis {
    static async getConnection() {
        if (!__classPrivateFieldGet(this, _a, "f", _Redis_connection)) {
            await Redis.prototype.openConnection();
        }
        return __classPrivateFieldGet(this, _a, "f", _Redis_connection);
    }
    async openConnection() {
        if (!__classPrivateFieldGet(Redis, _a, "f", _Redis_connection)) {
            __classPrivateFieldSet(Redis, _a, new ioredis_1.default(process.env.REDIS_URL), "f", _Redis_connection);
        }
    }
}
exports.Redis = Redis;
_a = Redis;
_Redis_connection = { value: void 0 };
