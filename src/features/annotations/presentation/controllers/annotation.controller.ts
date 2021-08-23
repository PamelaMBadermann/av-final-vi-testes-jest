import { HttpRequest, HttpResponse } from '../../../../core/presentation';
import { notFound, ok, serverError } from '../../../../core/presentation';
import { MVCController } from '../../../../core/presentation';
import { AnnotationRepository } from '../../infra';
import { CacheRepository } from '../../infra';
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

            const annotations = await this.#repository.getAll();
            
            if (!annotations || annotations.length === 0) {
                return notFound();
            }

            await this.#cache.set('annotation:all', annotations);

            return ok(annotations);
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
            const annotation = await this.#repository.create(request.body);
            
            await this.#cache.set(`annotation:${annotation.uid}`, annotation);
            await this.#cache.del('annotation:all');

            return ok(annotation);
        } catch (error) {
            return serverError();
        }
    }

    public async update(request: HttpRequest): Promise<HttpResponse> {
        const { uid } = request.params;

        try {
            const result = await this.#repository.update(uid, request.body);
            return ok(result);
        } catch (error) {
            return serverError();
        }
    }

    public async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { uid } = request.params;

            const result = await this.#repository.delete(uid);
            return ok(result);
        } catch (error) {
            return serverError();
        }
    }
}

