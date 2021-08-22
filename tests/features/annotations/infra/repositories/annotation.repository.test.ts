import { UserEntity, AnnotationEntity } from '../../../../../src//core/infra';
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