import { AnnotationEntity } from '../../../../core/infra';
import { Annotation } from '../../domain/models';

export class AnnotationRepository {
    async create(params: Annotation): Promise<Annotation> {
        const { title, description, userUID } = params;

        const annotation = await AnnotationEntity.create({
            title, 
            description
        }).save();

        return Object.assign({}, params, annotation);
    }

    async getAll(): Promise<Annotation[]> {
        const annotations = await AnnotationEntity.find();

        return annotations.map(annotation => ({
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            userUID: annotation.userUID
        }));
    }

    async getOne(uid: string): Promise<Annotation | null> {
        const annotation = await AnnotationEntity.findOne(uid);

        if (!annotation) {
            return null
        }

        return {
            uid: annotation.uid,
            title: annotation.title,
            description: annotation.description,
            userUID: annotation.userUID
        };
    }

    public async update(uid: string, params: Annotation): Promise<Annotation | null> {
        const annotation = await AnnotationEntity.findOne(uid);

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

    async delete(uid: string): Promise<void> {
        const annotation = await AnnotationEntity.findOne(uid);

        if (annotation) {
            annotation.remove();
        }
    }
}