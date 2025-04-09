import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @Column()
  userId: string;
}
