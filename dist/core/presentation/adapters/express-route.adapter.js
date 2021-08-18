"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMvcAdapter = exports.routerAdapter = void 0;
const enums_1 = require("./../enums");
const routerAdapter = (controller) => {
    return async (request, response) => {
        const httpRequest = {
            body: request.body,
            params: request.params
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            response.status(httpResponse.statusCode)
                .json(httpResponse.body);
        }
        else {
            response.status(httpResponse.statusCode)
                .json({ error: httpResponse.body.message });
        }
    };
};
exports.routerAdapter = routerAdapter;
const routerMvcAdapter = (controller, type) => {
    return async (request, response) => {
        const httpRequest = {
            body: request.body,
            params: request.params
        };
        let httpResponse;
        switch (type) {
            case enums_1.EMVC.INDEX:
                httpResponse = await controller.index(httpRequest);
                break;
            case enums_1.EMVC.SHOW:
                httpResponse = await controller.show(httpRequest);
                break;
            case enums_1.EMVC.STORE:
                httpResponse = await controller.store(httpRequest);
                break;
            case enums_1.EMVC.UPDATE:
                httpResponse = await controller.update(httpRequest);
                break;
            case enums_1.EMVC.DELETE:
                httpResponse = await controller.delete(httpRequest);
                break;
        }
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            response.status(httpResponse.statusCode)
                .json(httpResponse.body);
        }
        else {
            response.status(httpResponse.statusCode)
                .json({ error: httpResponse.body.message });
        }
    };
};
exports.routerMvcAdapter = routerMvcAdapter;
