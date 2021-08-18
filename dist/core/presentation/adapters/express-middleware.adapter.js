"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAdapter = void 0;
const middlewareAdapter = (middleware) => {
    return async (request, response, next) => {
        const requestMiddleware = {
            headers: request.headers,
            body: request.body
        };
        const httpResponse = await middleware.handle(requestMiddleware);
        if (httpResponse.statusCode === 200) {
            Object.assign(request, httpResponse.body);
            next();
        }
        else {
            response.status(httpResponse.statusCode)
                .json({ error: httpResponse.body.message });
        }
    };
};
exports.middlewareAdapter = middlewareAdapter;
