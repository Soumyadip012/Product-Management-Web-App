import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Product } from '../products/product.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
