import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: '', type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, length: 25, default: '', type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 'ACTIVE', type: 'varchar', length: 8 })
  status: string;
}

export default CustomerEntity;
