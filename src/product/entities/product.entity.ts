import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import type { Seller } from '../../seller/entities/seller.entity.js';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne('Seller', 'products', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}