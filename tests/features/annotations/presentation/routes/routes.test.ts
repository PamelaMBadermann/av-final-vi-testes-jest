import express, { Router } from 'express';
import request from 'supertest';
import Database from '../../../../../src/core/infra/data/connections/database';
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

jest.mock('../../../../../src/features/annotations/infra/repositories/annotations.repository.ts');

const makeUser = async (): Promise<User> => {
    return User.create({
        username: 'any_username',
        password: 'any_password'
    }).save();
}

const makeAnnotation = async (): Promise<AnnotationEntity> => {
    const user = await makeUser();

    return AnnotationEntity.create({
        title: 'any_title',
        description: 'any_description',
        userUID: user.uid,
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString()
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

        new AnnotationRoutes().init(router);
    });

    afterAll(async () => {
        await new Database().disconnectDatabase();
    });

    describe('/Post annotations', () => {
        test('should return code 400 when save annotation with invalid name', async () => {
            const user = await makeUser();

            await request(server).post('/annotations').send({
                description: 'any_description',
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString(),
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