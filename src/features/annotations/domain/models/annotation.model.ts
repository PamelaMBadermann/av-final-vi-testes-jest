import { User } from '../../../../core/domain';

export interface Annotation {
    uid: string;
    title: string;
    description: string;
    userUID: string;
    user?: User
}