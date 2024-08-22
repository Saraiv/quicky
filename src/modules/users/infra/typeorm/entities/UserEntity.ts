import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/CustomerEntity';

@Entity('users')
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: '', type: 'varchar' })
  name: string;

  @Column({ nullable: true, default: '', type: 'varchar' })
  email: string;

  @Column({ nullable: false, default: '', type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ nullable: true, default: '', type: 'varchar' })
  phone: string;

  @Column({ nullable: true, default: '', type: 'varchar' })
  address: string;

  @Column({ nullable: true, default: '', type: 'varchar' })
  number: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 'ACTIVE', type: 'varchar', length: 8 })
  status: string;

  @Column({ nullable: true, default: '', type: 'varchar' })
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default UserEntity;
