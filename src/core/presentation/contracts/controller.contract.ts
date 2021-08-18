import { HttpRequest, HttpResponse } from '../models';

export interface Controller {
    handle(request: HttpRequest): Promise<HttpResponse>;
}

export interface MVCController {
    index(request: HttpRequest): Promise<HttpResponse>;
    show(request: HttpRequest): Promise<HttpResponse>;
    store(request: HttpRequest): Promise<HttpResponse>;
    update(request: HttpRequest): Promise<HttpResponse>;
    delete(request: HttpRequest): Promise<HttpResponse>;
}