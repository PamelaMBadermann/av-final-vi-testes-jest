"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationRepository = void 0;
const infra_1 = require("../../../../core/infra");
class AnnotationRepository {
    async create(params) {
        const { title, description, userUID } = params;
        const annotation = await infra_1.AnnotationEntity.create({
            title,
            description
        }).save();
        return Object.assign({}, params, annotation);
    }
    async getAll() {
        const annotations = await infra_1.AnnotationEntity.find();
        return annotations.map(annotation => ({
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            userUID: annotation.userUID
        }));
    }
    async getOne(uid) {
        const annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (!annotation) {
            return null;
        }
        return {
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            userUID: annotation.userUID
        };
    }
    async update(uid, params) {
        const annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (!annotation) {
            return null;
        }
        annotation.title = params.title;
        annotation.description = params.description;
        annotation.save();
        return {
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            userUID: annotation.userUID,
        };
    }
    async delete(uid) {
        const annotation = await infra_1.AnnotationEntity.findOne(uid);
        if (annotation) {
            annotation.remove();
        }
    }
}
exports.AnnotationRepository = AnnotationRepository;
