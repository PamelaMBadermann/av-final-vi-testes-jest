import { AnnotationEntity } from '../../../../core/infra';
import { Annotation } from '../../domain';

interface ParamsCreate {
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    userUID: string
}

export class AnnotationRepository {
    async create(params: ParamsCreate): Promise<Annotation> {
        const { title, description, createdAt, updatedAt, userUID } = params;
        const annotation = await AnnotationEntity.create({
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

    async getAll(): Promise<Annotation[]> {
        const annotations = await AnnotationEntity.find();

        return await annotations.map(annotation => ({
            uid: annotation.uid,
            title: annotation.title, 
            description: annotation.description, 
            createdAt: annotation.createdAt, 
            updatedAt: annotation.updatedAt, 
            userUID: annotation.userUID
        }));
    }

    async getOne(uid: string): Promise<Annotation> {
        let annotation = await AnnotationEntity.findOne(uid);

        if (!annotation) {
            throw new Error('...');
        }

        annotation = annotation as AnnotationEntity;

        return {
            uid: annotation.uid,
            title: annotation.title, 
            description: annotation.description, 
            createdAt: annotation.createdAt, 
            updatedAt: annotation.updatedAt, 
            userUID: annotation.userUID
        };
    }

    async update(uid: string, params: ParamsCreate): Promise<Annotation> {
        const { title, description, createdAt, updatedAt, userUID } = params;
        const annotation = await AnnotationEntity.findOne(uid);

        if (!annotation) {
            throw new Error('...');
        }

        await AnnotationEntity.update(uid, {
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

    async delete(uid: string): Promise<void> {
        const annotation = await AnnotationEntity.findOne(uid);

        if (!annotation) {
            throw new Error('...');
        }

        await AnnotationEntity.delete(uid);
    }
} // 1:19:54