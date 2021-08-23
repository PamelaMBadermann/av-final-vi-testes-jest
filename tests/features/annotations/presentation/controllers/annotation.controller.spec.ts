import {
    HttpRequest,
    ok,
    notFound,
    serverError,
    AnnotationController
} from '../../../../../src/features/annotations/presentation';
import {
    AnnotationRepository,
    CacheRepository
} from '../../../../../src/features/annotations/infra';
import { Annotation } from '../../../../../src/features/annotations/domain/models';

jest.mock('../../../../../src/features/annotations/infra/repositories/annotation.repository.ts');
jest.mock('../../../../../src/core/infra/repositories/cache.repository.ts');

const makeRequestStore = (): HttpRequest => ({
    body: {
        title: 'any_title',
        description: 'any_description',
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString(),
        userUID: 'any_uid'
    },
    params: {}
});

const makeRequestShow = (): HttpRequest => ({
    body: {},
    params: { uid: 'any_uid' }
});

const makeResult = (): Annotation => ({
    uid: 'any_uid',
    title: 'any_title',
    description: 'any_description',
    userUID: 'any_uid'
});

const makeAnnotationResult = () => ({
    uid: 'any_uid',
    title: 'any_title',
    description: 'any_description',
    userUID: 'any_uid',
    createdAt: new Date('2021-08-23'),
    updatedAt: new Date('2021-08-23'),
});


const makeSut = (): AnnotationController => {
    return new AnnotationController(new AnnotationRepository(), new CacheRepository());
}

describe('Annotation Controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    describe('Store', () => {
        test('should return code 500 when throw any exception', async () => {
            jest.spyOn(AnnotationRepository.prototype, 'create')
                .mockRejectedValue(new Error());

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(serverError());
        });

        test('should call AnnotationRepository when pass correct values', async () => {
            const createSpy = jest.spyOn(AnnotationRepository.prototype, 'create');
            const sut = makeSut();

            await sut.store(makeRequestStore());

            expect(createSpy).toHaveBeenCalledWith(makeRequestStore().body);
        });

        test('should return code 200 when valid data is provided', async () => {
            jest.spyOn(AnnotationRepository.prototype, 'create')
                .mockResolvedValue(makeResult());

            const sut = makeSut();
            const result = await sut.store(makeRequestStore());

            expect(result).toEqual(ok(makeResult()));
        });

        test('should call CacheRepository when pass correct values', async () => {
            jest.spyOn(AnnotationRepository.prototype, 'create')
                .mockResolvedValue(makeResult());
            
            const setSpy = jest.spyOn(CacheRepository.prototype, 'set');
            const delSpy = jest.spyOn(CacheRepository.prototype, 'del');
            const sut = makeSut();
            await sut.store(makeRequestStore());

            expect(setSpy).toHaveBeenCalledWith(
                'annotation:any_uid',
                makeResult()
            );

            expect(delSpy).toHaveBeenCalledWith('annotation:all');
        });
    });

    describe('Show', () => {
        test('should return code 500 when has any error', async () => {
            jest.spyOn(CacheRepository.prototype, 'get')
                .mockRejectedValue(new Error());

                const sut = makeSut();
                const result = await sut.show(makeRequestShow());

                expect(result).toEqual(serverError());
        });

        test('should return 404 if theres no annotation', async () => {
            jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

            jest.spyOn(AnnotationRepository.prototype, 'getAll')
                .mockResolvedValue([]);

            const sut = makeSut();
            const result = await sut.show(makeRequestShow());

            expect(result).toEqual(notFound());
        });
    });
});