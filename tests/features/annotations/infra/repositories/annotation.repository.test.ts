import { UserEntity, AnnotationEntity, Database } from '../../../../../src//core/infra';
import { Annotation } from '../../../../../src/core/domain';

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

describe('Annotation Repository', () => {
    beforeAll(async _ => await new Database().openConnection());

    beforeEach(async _ => {
        await AnnotationEntity.clear();
        await UserEntity.clear();
    });

    afterAll(async _ => await new Database().disconnectDatabase());
});