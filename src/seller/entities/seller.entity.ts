import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity.js';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}
