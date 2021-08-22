import express, { Router } from 'express';
import request from 'supertest';
import {
    Database,
    AnnotationEntity,
    UserEntity
} from '../../../../../src/core/infra';
import App from '../../../../../src/core/presentation/app';
import { Annotation } from '../../../../../src/core/domain/models';
import AnnotationRoutes from '../../../../../src/features/annotations/presentation/routes/routes';
import {
    AnnotationRepository
} from '../../../../../src/features/annotations/infra';

jest.mock('../../../../../src/features/annotations/infra/repositories/annotation.repository.ts');
jest.mock('../../../../../src/core/infra/repositories/cache.repository.ts');

const makeUser = async (): Promise<UserEntity> => {
    return UserEntity.create({
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
        await UserEntity.clear();

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
        test('should return code 400 when save annotation with invalid title', async () => {
            const user = await makeUser();

            await request(server).post('/annotations').send({
                description: 'any_description',
                createdAt: new Date(Date.now()).toLocaleDateString(),
                updatedAt: new Date(Date.now()).toLocaleDateString(),
                userUID: user.uid
            }).expect(400, {error: 'Missing param: title'});
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
                updatedAt: new Date(Date.now()).toLocaleDateString(),
            }).expect(200)
              .expect(request => {
                  expect(request.body.userUID).toBe(annotation.userUID);
              });
        });
        
        test('should return code 400 when userUID is invalid', async () => {
            await request(server).post('/annotations').send({
                title: 'any_title',
                description: 'any_description',
                created_at: new Date(Date.now()).toLocaleDateString(),
                updated_at: new Date(Date.now()).toLocaleDateString(),
                userUID: 'fake_uid'
            }).expect(400, {error: 'Invalid param: userUID'});
        });
    });

    describe('Get annotations', () => {
        test('should return code 200 when has any annotation', async () => {
            const annotation = await makeAnnotation();

            jest.spyOn(AnnotationRepository.prototype, 'getAll')
                .mockResolvedValue([annotation]);

            await request(server).get('/annotations')
                                 .send()
                                 .expect(200);
        }); 
    });

    describe('/Get/ annotations/:uid', () => {
        test('should return code 200 when get annotation by uid', async () => {
            const annotation = await makeAnnotation();

            jest.spyOn(AnnotationRepository.prototype, 'getOne')
                .mockResolvedValue(annotation);

            await request(server).get(`/annotations/${annotation.uid}`)
                                 .send()
                                 .expect(200)
                                 .expect(request => {
                                     expect(request.body.uid).toEqual(annotation.uid);
                                 });
        });
    });
});