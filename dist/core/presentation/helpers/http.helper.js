"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.badRequest = exports.ok = void 0;
const errors_1 = require("./../errors");
const ok = (body) => ({
    statusCode: 200,
    body
});
exports.ok = ok;
const badRequest = (error) => ({
    statusCode: 400,
    body: error
});
exports.badRequest = badRequest;
const notFound = () => ({
    statusCode: 404,
    body: new errors_1.DataNotFoundError()
});
exports.notFound = notFound;
const serverError = () => ({
    statusCode: 500,
    body: new errors_1.ServerError()
});
exports.serverError = serverError;
