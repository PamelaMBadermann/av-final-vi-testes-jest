import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { ok, badRequest, InvalidParamError } from '../../../../core/presentation';
import { Annotation } from '../../domain/models';
import { UserRepository } from '../../../../core/infra';

export class UserExistentMiddleware {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const body: Annotation = request.body;
        const user = await new UserRepository().getOne(body.userUID);
            
        if (!user) {
            return badRequest(new InvalidParamError('userUID'));
        }

        return ok({});
    }
}