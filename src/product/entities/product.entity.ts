import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seller } from '../../seller/entities/seller.entity.js';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Seller, (seller) => seller.products, { onDelete: 'CASCADE' })
  seller: Seller;
}