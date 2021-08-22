import { User } from '..';

export interface Annotation {
    uid: string;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userUID: string;
    user?: User;
}