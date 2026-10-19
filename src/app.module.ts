import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SellerModule } from './seller/seller.module.js';
import { ProductModule } from './product/product.module.js';

const migrationsDir = join(
  fileURLToPath(new URL('.', import.meta.url)),
  'database/migrations/*.js',
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.getOrThrow<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        migrations: [migrationsDir],
        migrationsRun: false,
      }),
    }),
    SellerModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
