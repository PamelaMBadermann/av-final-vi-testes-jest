import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';

@Entity({ name: 'annotations' })
export class AnnotationEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;

    @Column()
    title!: string;

    @Column()
    description?: string;

    @Column({ name: 'user_uid' })
    userUID!: string;

    @Column({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(type => UserEntity, user => user.annotations)
    @JoinColumn({name: 'user_uid', referencedColumnName: 'uid'})
    user!: UserEntity;

    @BeforeInsert()
    private beforeInsert() {
        this.uid = uuid();
        this.createdAt = new Date(Date.now());
        this.updatedAt = new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}