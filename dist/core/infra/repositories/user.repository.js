"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const infra_1 = require("../../infra");
class UserRepository {
    async getOne(uid) {
        const user = await infra_1.UserEntity.findOne(uid);
        if (!user) {
            return null;
        }
        return {
            uid: user.uid,
            username: user.username,
            password: user.password
        };
    }
}
exports.UserRepository = UserRepository;
