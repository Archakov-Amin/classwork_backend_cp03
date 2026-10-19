import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { Seller } from '../entities/seller.entity.js';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindSellersQueryDto {
  @ApiPropertyOptional({ description: 'Страница'})
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Лимит'})
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Название'})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Отсортировать по...'})
  @IsOptional()
  @IsString()
  sortBy?: string = 'id';

  @ApiPropertyOptional({ description: 'Тип сортировки'})
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

export interface PaginatedSellersResponse {
  data: Seller[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
