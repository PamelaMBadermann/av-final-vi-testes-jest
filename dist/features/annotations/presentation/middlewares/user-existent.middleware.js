"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistentMiddleware = void 0;
const presentation_1 = require("../../../../core/presentation");
const infra_1 = require("../../../../core/infra");
class UserExistentMiddleware {
    async handle(request) {
        const body = request.body;
        const user = await new infra_1.UserRepository().getOne(body.userUID);
        if (!user) {
            return presentation_1.badRequest(new presentation_1.InvalidParamError('userUID'));
        }
        return presentation_1.ok({});
    }
}
exports.UserExistentMiddleware = UserExistentMiddleware;
