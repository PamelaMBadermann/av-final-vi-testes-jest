import { Entity, BaseEntity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AnnotationEntity } from './annotation.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @PrimaryColumn()
    uid!: string;

    @Column()
    username!: string;

    @Column()
    password?: string;

    @Column({name: 'created_at'})
    createdAt!: Date;

    @Column({name: 'updated_at'})
    updatedAt!: Date;

    @OneToMany(type => AnnotationEntity, annotation => annotation.user)
    annotations!: AnnotationEntity[];

    @BeforeInsert()
    private beforeInsert() {
        this.uid = this.uid ? this.uid : uuid();
        this.createdAt = this.createdAt ? this.createdAt : new Date(Date.now());
        this.updatedAt = this.updatedAt ? this.updatedAt : new Date(Date.now());
    }

    @BeforeUpdate()
    private beforeUpdate() {
        this.updatedAt = new Date(Date.now());
    }
}