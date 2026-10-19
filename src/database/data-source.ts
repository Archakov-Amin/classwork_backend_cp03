import { DataSource } from 'typeorm';
import { Seller } from '../seller/entities/seller.entity.js';
import { Product } from '../product/entities/product.entity.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'users',
  synchronize: false,
  logging: true,
  entities: [Seller, Product],
  migrations: ['dist/database/migrations/*.js'],
});
