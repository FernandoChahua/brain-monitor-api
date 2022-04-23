/* eslint-disable import/no-cycle */
import { Exclude, instanceToPlain } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
    ADMIN = 'A',
    USER = 'U',
}

export enum UserStatus {
    ACTIVE = 'A',
    INACTIVE = 'I',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'email', unique: true, nullable: false })
    email: string;

  @Column({ name: 'password', nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: Role,
    default: Role.USER,
  })
    role: Role;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
    status: UserStatus;

  toJSON() {
    return instanceToPlain(this);
  }
}
