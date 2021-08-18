import { Request, Response } from 'express';
import { Controller, MVCController } from './../contracts';
import { HttpRequest, HttpResponse } from './../models';
import { EMVC } from './../enums';

export const routerAdapter = (controller: Controller) => {
    return async (request: Request, response: Response) => {
        const httpRequest: HttpRequest = {
            body: request.body,
            params: request.params
        };

        const httpResponse: HttpResponse = await controller.handle(httpRequest);

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            response.status(httpResponse.statusCode)
                    .json(httpResponse.body);
        } else {
            response.status(httpResponse.statusCode)
                    .json({error: httpResponse.body.message});
        }
    }
}

export const routerMvcAdapter = (controller: MVCController, type: EMVC) => {
    return async (request: Request, response: Response) => {
        const httpRequest: HttpRequest = {
            body: request.body,
            params: request.params
        };

        let httpResponse: HttpResponse;   

        switch (type) {
            case EMVC.INDEX: 
                httpResponse = await controller.index(httpRequest);
                break;
            case EMVC.SHOW: 
                httpResponse = await controller.show(httpRequest);
                break;
            case EMVC.STORE: 
                httpResponse = await controller.store(httpRequest);
                break;
            case EMVC.UPDATE: 
                httpResponse = await controller.update(httpRequest);
                break;
            case EMVC.DELETE: 
                httpResponse = await controller.delete(httpRequest);
                break;
        }

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            response.status(httpResponse.statusCode)
                    .json(httpResponse.body);
        } else {
            response.status(httpResponse.statusCode)
                    .json({error: httpResponse.body.message});
        }
    }
}