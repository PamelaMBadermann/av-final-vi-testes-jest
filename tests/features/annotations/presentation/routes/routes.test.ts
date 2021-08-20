import express, { Router } from 'express';
import request from 'supertest';
<<<<<<< HEAD
import Database from '../../../../../src/core/infra/data/connections/database';
=======
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
import {
    AnnotationEntity,
    User
} from '../../../../../src/core/infra';
import App from '../../../../../src/core/presentation/app';
import { Annotation } from '../../../../../src/core/domain/models';
import AnnotationRoutes from '../../../../../src/features/annotations/presentation/routes/routes';
import {
    AnnotationRepository
} from '../../../../../src/features/annotations/infra';
<<<<<<< HEAD

jest.mock('../../../../../src/features/annotations/infra/repositories/annotations.repository.ts');
=======
import { Database } from '../../../../../src/core/infra';

jest.mock('../../../../../src/features/annotations/infra/repositories/annotation.repository.ts');
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76

const makeUser = async (): Promise<User> => {
    return User.create({
        username: 'any_username',
        password: 'any_password'
    }).save();
}

<<<<<<< HEAD
const makeAnnotation = async (): Promise<AnnotationEntity> => {
    const user = await makeUser();

    return AnnotationEntity.create({
        title: 'any_title',
        description: 'any_description',
        userUID: user.uid,
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString()
=======
const makeAnnotation = async (): Promise<Annotation> => {
    const user = await makeUser();
    
    return AnnotationEntity.create({
        uid: 'any_uid',
        title: 'any_title',
        description: 'any_description',
        userUID: user.uid,
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
    }).save();
}

describe('Annotation routes', () => {
    const server = new App().server;

    beforeEach(async () => {
        await AnnotationEntity.clear();
        await User.clear();

        jest.resetAllMocks();
    });

    beforeAll(async () => {
        await new Database().openConnection();

        const router = Router();
        server.use(express.json());
        server.use(router);

<<<<<<< HEAD
        new AnnotationRoutes().init(router);
=======
        new AnnotationRoutes().init(router)
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
    });

    afterAll(async () => {
        await new Database().disconnectDatabase();
    });

<<<<<<< HEAD
    describe('/Post annotations', () => {
=======
    describe ('/Post annotations', () => {
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
        test('should return code 400 when save annotation with invalid name', async () => {
            const user = await makeUser();

            await request(server).post('/annotations').send({
                description: 'any_description',
<<<<<<< HEAD
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString(),
=======
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
                userUID: user.uid
            }).expect(400, {error: 'Missing param: name'});
        });

        test('should return code 200 when save a new annotation', async () => {
            const annotation = await makeAnnotation();

            jest.spyOn(AnnotationRepository.prototype, 'create')
                .mockResolvedValue(annotation);

            await request(server).post('/annotations').send({
                title: 'any_title',
                description: 'any_description',
<<<<<<< HEAD
                userUid: annotation.userUID,
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString(),
            }).expect(200)
              .expect(request => {
                  expect(request.body.userUID).toBe(annotation.userUID);
              });
        });
        
    });
});
=======
                userUID: annotation.userUID,
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString()
            }).expect(200)
                .expect(request => {
                    expect(request.body.userUID).toBe(annotation.userUID);
                });
        });

        test('should return code 400 when userUID is invalid', async () => {
            await request(server).post('/annotations').send({
                title: 'any_title',
                description: 'any_description',
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString()
            })
        })
    })
})
>>>>>>> 4c559d443fc35e60884f9943c7493d3ecf694e76
