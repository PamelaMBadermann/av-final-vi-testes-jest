import { User } from './user.model';

export interface Annotation {
    uid: string;
    title: string;
    description: string;
    userUID: User;
}