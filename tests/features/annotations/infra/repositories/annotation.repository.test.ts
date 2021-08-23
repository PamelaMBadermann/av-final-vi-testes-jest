import { UserEntity, AnnotationEntity, Database } from '../../../../../src/core/infra';
import { Annotation } from '../../../../../src/core/domain';
import { AnnotationRepository } from '../../../../../src/features/annotations/infra';

const makeUser = async (): Promise<UserEntity> => {
    return UserEntity.create({
        username: 'any_username',
        password: 'any_password'
    }).save();
}

const makeAnnotation = async (): Promise<Annotation> => {
    const user = await makeUser();

    return AnnotationEntity.create({
        title: 'any_title',
        description: 'any_description',
        userUID: user.uid,
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString()
    }).save();
}

const makeParams = async () => {
    const user = await makeUser();

    return {
        title: 'any_title',
        description: 'any_description',
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString(),
        userUID: user.uid
    };
}

const makeUpdateParams = async (userUID: string): Promise<Annotation> => {
    return {
        uid: 'any_uid',
        title: 'any_title',
        description: 'updated',
        createdAt: new Date('2021-08-22'),
        updatedAt: new Date('2021-08-23'),
        userUID: userUID
    };
}

describe('Annotation Repository', () => {
    beforeAll(async () => {
        await new Database().openConnection();
    });

    beforeEach(async () => {
        await AnnotationEntity.clear();
        await UserEntity.clear();
    });

    afterAll(async () => {
        await new Database().disconnectDatabase();
    });

    describe('GetAll', () => {
        test('should return a list of annotations when has any annotation', async () => {
            const annotation = await makeAnnotation();
            
            jest.spyOn(AnnotationRepository.prototype, 'getAll')
                .mockResolvedValue([annotation]);

            const sut = new AnnotationRepository();
            const result = await sut.getAll();

            expect(result.length > 0).toBeTruthy();
        });
    });

    describe('GetOne', () => {
        test('should return a annotation when has a annotation with uid defined', async () => {
            const annotation = await makeAnnotation();

            jest.spyOn(AnnotationRepository.prototype, 'getOne')
                .mockResolvedValue(annotation);

            const sut = new AnnotationRepository();
            const result = await sut.getOne(annotation.uid);

            expect(result.uid).toEqual(annotation.uid);
        });
    });

    describe('Create', () => {
        test('should create a new annotation when has valid params', async () => {
            const params = await makeParams();
            const annotation = new AnnotationRepository();
            const result = await annotation.create(params);
            
            expect(result).toBeTruthy();
            expect(result.uid).toBeTruthy();
            expect(result.title).toEqual(params.title);
            expect(result.description).toEqual(params.description);
        });
    });

    describe('Delete', () => {
        test('should delete a annotation when has valid Uid', async () => {
            const sut = new AnnotationRepository();
            const annotation = await makeAnnotation();

            const result = await sut.delete(annotation.uid);

            expect(result).toBeTruthy();
        });
    });
});