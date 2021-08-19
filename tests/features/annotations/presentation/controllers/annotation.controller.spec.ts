import {
    HttpRequest,
    notFound,
    ok,
    serverError,
    AnnotationController
} from '../../../../../src/features/annotations/presentation';
import {
    AnnotationRepository,
    CacheRepository
} from '../../../../../src/features/annotations/infra';
import { Annotation } from '../../../../../src/features/annotations/domain/models';

jest.mock('../../../../../src/features/annotations/infra/repositories/project.repository.ts');
jest.mock('../../../../../src/features/annotations/infra/repositories/cache.repository.ts');

const makeRequestStore = (): HttpRequest => ({
    body: {
        title: 'any_title',
        description: 'any_description',
        startAt: new Date(Date.now()).toLocaleDateString(),
        finishAt: new Date(Date.now()).toLocaleDateString(),
        userUID: 'any_uid'
    },
    params: {}
});

const makeRequestShow = (): HttpRequest => ({
    body: {},
    params: { uid: 'any_uid' }
});

const makeRequestResult = (): Annotation => ({
    uid: 'any_uid',
    title: 'any_title',
    description: 'any_description',
    userUID: 'any_uid'
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
            jest.spyOn(AnnotationRepository.prototype, 'create');

            // parei em 2:32:16
        });
    });
});