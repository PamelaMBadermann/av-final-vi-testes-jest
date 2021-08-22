"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationRepository = void 0;
const infra_1 = require("../../../../core/infra");
class AnnotationRepository {
    async create(params) {
        const { title, description, createdAt, updatedAt, userUID } = params;
        const annotation = await infra_1.AnnotationEntity.create({
            title,
            description,
            createdAt,
            updatedAt,
            userUID
        }).save();
        return {
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            createdAt: annotation.createdAt,
            updatedAt: annotation.updatedAt,
            userUID: annotation.userUID
        };
    }
    async getAll() {
        const annotations = await infra_1.AnnotationEntity.find();
        return await annotations.map(annotation => ({
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            createdAt: annotation.createdAt,
            updatedAt: annotation.updatedAt,
            userUID: annotation.userUID
        }));
    }
    async getOne(uid) {
        let annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (!annotation) {
            throw new Error('...');
        }
        annotation = annotation;
        return {
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            createdAt: annotation.createdAt,
            updatedAt: annotation.updatedAt,
            userUID: annotation.userUID
        };
    }
    async update(uid, params) {
        const { title, description, createdAt, updatedAt, userUID } = params;
        const annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (!annotation) {
            throw new Error('...');
        }
        await infra_1.AnnotationEntity.update(uid, {
            title,
            description,
            createdAt,
            updatedAt,
            userUID
        });
        return {
            uid,
            title,
            description,
            userUID
        };
    }
    async delete(uid) {
        const annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (!annotation) {
            throw new Error('...');
        }
        await infra_1.AnnotationEntity.delete(uid);
    }
}
exports.AnnotationRepository = AnnotationRepository;
