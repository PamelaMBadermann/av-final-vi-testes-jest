import { HttpResponse } from '../models';
import { DataNotFoundError, ServerError } from './../errors';

export const ok = (body: any): HttpResponse => ({
    statusCode: 200,
    body
});

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
});

export const notFound = (): HttpResponse => ({
    statusCode: 404,
    body: new DataNotFoundError()
});

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
});
