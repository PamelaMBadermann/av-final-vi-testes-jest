import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, badRequest, serverError, InvalidParamError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { AnnotationRepository } from '../../infra';
import { CacheRepository } from '../../infra';
import { User } from '../../../../core/infra';

export class AnnotationController implements MVCController {
    readonly #repository: AnnotationRepository;
    readonly #cache: CacheRepository;

    constructor(repository: AnnotationRepository, cache: CacheRepository) {
        this.#repository = repository;
        this.#cache = cache;
    }

    public async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const cache = await this.#cache.get('annotation:all');

            if (cache) {
                return ok(cache);
            }
            
            const annotation = await this.#repository.getAll();
            return ok(annotation);
        } catch (error) {
            return serverError();
        }
    }

    public async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            const cache = await this.#cache.get(`annotation:${uid}`);

            if (cache) {
                return ok(cache);
            }
            
            const annotation = await this.#repository.getOne(uid);

            if (!annotation) {
                return notFound();
            }

            await this.#cache.set(`anottation:${uid}`, annotation);

            return ok(annotation);
        } catch (error) {
            return serverError();
        }
    }

    public async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const user = await User.findOne(request.body.userUID);
            
            if (!user) {
                return badRequest(new InvalidParamError('userUID'));
            }

            const annotation = await this.#repository.create(request.body);
            
            await this.#cache.set(`annotation:${annotation.uid}`, annotation);
            await this.#cache.del('project:all');

            return ok(annotation);
        } catch (error) {
            return serverError();
        }
    }

    public async update(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;
        const annotation = await this.#repository.create(request.body);
        return ok(annotation);
    }

    public async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;
            await this.#repository.delete(uid);
        
            return ok ({});
        } catch (error) {
            return serverError();
        }
    }
}

