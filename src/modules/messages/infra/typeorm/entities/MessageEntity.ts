import Users from '@modules/users/infra/typeorm/entities/UserEntity';
import Customers from '@modules/customers/infra/typeorm/entities/CustomerEntity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('messages')
class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: '' })
  message: string;

  @Column('uuid')
  from_user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'from_user_id' })
  from_user: Users;

  @Column('uuid')
  to_user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'to_user_id' })
  to_user: Users;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MessageEntity;
