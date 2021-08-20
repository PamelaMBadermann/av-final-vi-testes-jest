import express, { Router } from 'express';
import request from 'supertest';
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
import { Database } from '../../../../../src/core/infra';

jest.mock('../../../../../src/features/annotations/infra/repositories/annotation.repository.ts');

const makeUser = async (): Promise<User> => {
    return User.create({
        username: 'any_username',
        password: 'any_password'
    }).save();
}

const makeAnnotation = async (): Promise<Annotation> => {
    const user = await makeUser();
    
    return AnnotationEntity.create({
        uid: 'any_uid',
        title: 'any_title',
        description: 'any_description',
        userUID: user.uid,
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

        new AnnotationRoutes().init(router)
    });

    afterAll(async () => {
        await new Database().disconnectDatabase();
    });

    describe ('/Post annotations', () => {
        test('should return code 400 when save annotation with invalid name', async () => {
            const user = await makeUser();

            await request(server).post('/annotations').send({
                description: 'any_description',
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
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