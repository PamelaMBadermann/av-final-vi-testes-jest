import { NextFunction, Request, Response } from 'express';
import { HttpResponse, HttpMiddleware } from '../models';

export const middlewareAdapter = (middleware: any) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const requestMiddleware: HttpMiddleware = {
            headers: request.headers,
            body: request.body
        };

        const httpResponse: HttpResponse = await middleware.handle(requestMiddleware);

        if (httpResponse.statusCode === 200) {
            Object.assign(request, httpResponse.body);
            next();
        } else {
            response.status(httpResponse.statusCode)
                    .json({error: httpResponse.body.message});
        }            
    }
}
